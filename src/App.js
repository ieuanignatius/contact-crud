import React, {useEffect, useState} from 'react';
import Modal from './components/Modal';
import Loading  from "./components/Loading";

import { useGetContactList, findContactById, addContactDetail, editContactDetail, deleteContact } from "./models";

import './style/index.scss';

const initialPayload = {
  firstName: '',
  lastName: '',
  age: '',
  photo: ''
};

function App() {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ message, setMessage ] = useState('');
  const [searchContact, setSearchContact ] = useState('');
  const [contactList, setContactList ] = useState([]);
  
  useGetContactList({setIsLoading, searchContact, setContactList}, [message, searchContact]);
  
  const [ showModal, setShowModal ] = useState(false);
  const [ selectedId, setSelectedId ] = useState(false);
  const [ contactPayload, setContactPayload ] = useState({});
  const {
    firstName,
    lastName,
    age,
    photo
  } = contactPayload;
  
  let searchTimeout = false;
  
  const handleSearch = e => {
    const { target } = e;
    const { value } = target;
    
    if(searchTimeout) {
      clearTimeout(searchTimeout);
    }
  
    searchTimeout = setTimeout(() => {
      setSearchContact(value);
      if(value) {
        findContactById(value, setIsLoading, setContactList);
      }
    }, 300);
  };
  
  const handleModalToggle = (id = false, payload = initialPayload) => {
    setSelectedId(id);
    setContactPayload(payload);
    setShowModal(!showModal);
  };
  
  const handleChangeInput = (e) => {
    const { target } = e;
    const { type, name, value } = target;
    
    if(type === 'number' && value && value < 1){
      return;
    }
    
    setContactPayload({
      ...contactPayload,
      [name]: value
    });
  };
  
  const handleAddUpdateContact = (e) => {
    e.preventDefault();
    
    if(selectedId === false) {
      Promise.resolve(
        addContactDetail(contactPayload, setIsLoading)
      ).then(message => {
        setMessage(message);
    
        if(message) {
          alert(message);
        }
    
        handleModalToggle();
      });
      
      return;
    }
    
    Promise.resolve(
      editContactDetail(selectedId, contactPayload, setIsLoading)
    ).then(message => {
      setMessage(message);
  
      if(message) {
        alert(message);
      }
  
      handleModalToggle();
    });
  };
  
  const handleDeleteContact = (e, id) => {
    e.preventDefault();
    
    Promise.resolve(
      deleteContact(id, setIsLoading)
    ).then(message => {
      setMessage(message);
  
      if(message) {
        alert(message);
      }
    });
  };
  
  return (
    <div className="app">
      <div className="layout">
        <h1>Contact</h1>
        <div className="contact-list-header">
          <div className="input-container">
            <label className="input-label" htmlFor="search">Search</label>
            <input
              id="search"
              type="text"
              name='search'
              onChange={handleSearch}
              placeholder="Find Contact By Full ID"
            />
          </div>
          <div className="add-contact">
            <button className="btn primary-btn" onClick={() => handleModalToggle()}>Add More Contact</button>
          </div>
        </div>
        <div className="contact-list-container">
          <table>
            <thead>
            <tr>
              <th className="left-align">ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Photo</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {isLoading || contactList.length < 1 ? (
              <tr>
                <td colSpan={6}>
                  <Loading isLoading={isLoading}>
                    No Data
                  </Loading>
                </td>
              </tr>
            ) : (
              contactList.map((item, index) => {
                const { id, firstName, lastName, age, photo } = item;
                const payload = {
                  firstName,
                  lastName,
                  age,
                  photo
                };
    
                return (
                  <tr key={index}>
                    <td className="left-align">{id}</td>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{age}</td>
                    <td>
                      {photo !== 'N/A' ? (
                          <img src={photo} alt="contact"/>
                        ) :
                        photo
                      }
                    </td>
                    <td className="action">
                      <div className="btn-group">
                        <button className="btn info-btn" onClick={() => handleModalToggle(id, payload)}>Edit</button>
                        <button className="btn danger-btn" onClick={e => handleDeleteContact(e, id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        className="contact-form-modal"
        isShow={showModal}
        title={selectedId === false ? 'Add New Contact' : 'Edit Contact'}
        onCloseModal={handleModalToggle}
      >
        <div className="contact-form">
          <div className="input-group">
            <input
              name="firstName"
              type="text"
              value={firstName}
              onChange={handleChangeInput}
              placeholder="First Name"
            />
          </div>
          <div className="input-group">
            <input
              name="lastName"
              type="text"
              value={lastName}
              onChange={handleChangeInput}
              placeholder="Last Name"
            />
          </div>
          <div className="input-group">
            <input
              name="age"
              type="number"
              value={age}
              min={1}
              onChange={handleChangeInput}
              placeholder="Age"
            />
          </div>
          <div className="input-group">
            <input
              name="photo"
              type="text"
              value={photo}
              onChange={handleChangeInput}
              placeholder="Photo URL"
            />
          </div>
        </div>
        <div className="contact-form-footer btn-group">
          <button className="btn success-btn" onClick={e => handleAddUpdateContact(e)}>{selectedId === false ? 'Add' : 'Update'}</button>
          <button className="btn danger-btn" onClick={handleModalToggle}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
