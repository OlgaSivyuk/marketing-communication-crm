import React from 'react';
import './PopupWithForm.css';

function PopupWithForm({ 
  name, 
  title, 
  subtitle, 
  id, 
  formName, 
  buttonTextConfirm,  
  children, 
  onClose, 
  isOpen, 
  onSubmit
}) {
  
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ' '}`}
    >
      <div className='popup__body'>
        <h3 className='popup__title'>{title}</h3>
        <p className='popup__subtitle'>{subtitle}</p>
        <form
          className={`popup__form popup__form_${name}`}
          name={formName}
          id={id}
          onSubmit={onSubmit}
          autoComplete='off'
        >
          {children}
        </form>
        <div className='popup__button-wrapper'>
          <button
            type='submit'
            className='popup__button popup__submit '
            onClick={onSubmit}
          >
            {buttonTextConfirm}
          </button>
          {/* <button className='popup__button popup__cancel' onClick={onClose}>
              {buttonText}
            </button> */}
        </div>
        <button
          type='button'
          className='popup__close-popup'
          aria-label='Закрыть'
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
