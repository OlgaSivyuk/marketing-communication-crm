import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { useLocation } from 'react-router-dom';

function PopupDeleteCardConfirm({
  isOpen,
  onClose,
  confirmEventDelete,
  confirmAudienceDelete,
}) {

  const location = useLocation();

  function handleSubmitEvent(event) {
    console.log('удалить c попапа');
    event.preventDefault();
    confirmEventDelete();
  };

  function handleSubmitAudience(event) {
    console.log('удалить c попапа аудиитория');
    event.preventDefault();
    confirmAudienceDelete();
  };

  return (
    <>
      {location.pathname === '/sends' && (
        <PopupWithForm
          name='delete-card'
          title='Точно удалить?'
          subtitle='Востановить не получится'
          id='form-delete-card'
          formName='delete-place-card'
          buttonTextConfirm='Удалить'
          buttonText='Отменить'
          onSubmit={handleSubmitEvent}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}

      {location.pathname === '/audience' && (
        <PopupWithForm
          name='delete-card'
          title='Точно удалить?'
          subtitle='Востановить не получится'
          id='form-delete-card'
          formName='delete-place-card'
          buttonTextConfirm='Удалить'
          buttonText='Отменить'
          onSubmit={handleSubmitAudience}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
}

export default PopupDeleteCardConfirm;