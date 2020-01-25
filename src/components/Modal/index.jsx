import React from 'react';
import { bool, string, node, func } from 'prop-types';
import { Transition } from 'react-transition-group';

import './style.scss';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  height: 0
};

const transitionStyles = {
  entering: { opacity: 1, height: '100%' },
  entered:  { opacity: 1, height: '100%' },
  exiting:  { opacity: 0, height: '100%' },
  exited:  { opacity: 0, height: 0 },
};

const Modal = (props) => {
  const { className, isShow, title, children, onCloseModal } = props;
  
  return (
    <Transition in={isShow} timeout={duration}>
      {state => (
        <div
          className="modal-component"
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}
        >
          <div className="overlay" onClick={onCloseModal}/>
          {isShow && (
            <div className={`modal-container${className ? ` ${className}` : ''}`}>
              {title && (
                <div className="modal-header">
                  <span className="modal-title">{title}</span>
                  {onCloseModal && (
                    <span className="close-btn" onClick={onCloseModal}>X</span>
                  )}
                </div>
              )}
              <div className="modal-body">
                {children && children}
              </div>
            </div>
          )}
        </div>
      )}
    </Transition>
  );
};

Modal.propTypes = {
  className: string,
  children: node,
  isShow: bool,
  title: string,
  onCloseModal: func
};

export default Modal;