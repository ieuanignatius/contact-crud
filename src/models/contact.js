import { useState, useEffect } from 'react';
import fetch from 'isomorphic-fetch';

const url = 'https://simple-contact-crud.herokuapp.com/contact';

export const useGetContactList = ({setIsLoading, searchContact, setContactList}, deps = []) => {
  useEffect(() => {
    if(searchContact === '') {
      setIsLoading(true);
      const getContactList = async () => {
        const res = await fetch(url);
        const json = await res.json();
        setContactList(json?.data || []);
        setIsLoading(false);
      };
  
      getContactList();
    }
  }, deps);
};

//actually this function is not necessary because of the web that i make does not need to consume api this way to search a single contact
//but i will make it in order to use all APIs
export const findContactById = async (id, setIsLoading, setContactList) => {
  setIsLoading(true);
  
  const res = await fetch(url+`/${id}`);
  const json = await res.json();
  setIsLoading(false);
  
  setContactList(json?.data ? [json?.data] : []);
};

export const addContactDetail = async (payload, setIsLoading) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(payload)
  };
  
  setIsLoading(true);
  
  const res = await fetch(url, options);
  const json = await res.json();
  setIsLoading(false);
  
  return json?.message || '';
};

export const editContactDetail = async (id, payload, setIsLoading) => {
  const options = {
    method: 'PUT',
    body: JSON.stringify(payload)
  };
  
  setIsLoading(true);
  
  const res = await fetch(url+`/${id}`, options);
  const json = await res.json();
  setIsLoading(false);
  
  return json?.message || '';
};

export const deleteContact = async (id, setIsLoading) => {
  const options = {
    method: 'DELETE'
  };
  
  setIsLoading(true);
  
  const res = await fetch(url+`/${id}`, options);
  const json = await res.json();
  setIsLoading(false);
  
  return json.message || '';
};