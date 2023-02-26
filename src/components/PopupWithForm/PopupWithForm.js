import React from 'react';
import './PopupWithForm.css';
import { useLocation } from 'react-router-dom';


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
  onSubmit,
  resetSelectFieldCategory,
  resetSelectFieldCanal,
  resetSelectFieldAudience,
  reset
}) {

  const location = useLocation();

  function closePopup(){
    onClose();
  }

  function closePopupAudience(){
    onClose();
    reset();
    resetSelectFieldCategory();
  }

  function closePopupCalender(){
    onClose();
    reset();
    resetSelectFieldCanal();
    resetSelectFieldAudience();
  }
  
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : " "}`}
    >
      <div className="popup__body">
        <h3 className="popup__title">{title}</h3>
        <p className="popup__subtitle">{subtitle}</p>
        <form
          className={`popup__form popup__form_${name}`}
          name={formName}
          id={id}
          onSubmit={onSubmit}
          autoComplete="off"
        >
          {children}
        </form>
        <div className="popup__button-wrapper">
          <button
            type="submit"
            className="popup__button popup__submit "
            onClick={onSubmit}
          >
            {buttonTextConfirm}
          </button>
        </div>
        {location.pathname === "/sends" && (
          <button
            type="button"
            className="popup__close-popup"
            aria-label="Закрыть"
            onClick={closePopup}
          ></button>
        )}

        {location.pathname === "/audience" && (
          <button
            type="button"
            className="popup__close-popup"
            aria-label="Закрыть"
            onClick={closePopupAudience}
          ></button>
        )}

        {location.pathname === "/calender" && (
          <button
            type="button"
            className="popup__close-popup"
            aria-label="Закрыть"
            onClick={closePopupCalender}
          ></button>
        )}
      </div>
    </div>
  );
}

export default PopupWithForm;
