import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { useLocation } from 'react-router-dom';

function PopupDeleteCardConfirm({
  isOpen,
  onClose,
  confirmEventDelete,
  confirmAudienceDelete,
  event
}) {


  console.log('event popup', event)
  const location = useLocation();

  function handleSubmitEvent(event) {
    console.log('Delete c попапа');
    event.preventDefault();
    confirmEventDelete();
  };

  function handleSubmitAudience(event) {
    console.log('Delete c попапа аудиитория');
    event.preventDefault();
    confirmAudienceDelete();
  };

  return (
    <>
      {location.pathname === '/sends' && ( //`/sends/${event.id}`
        <PopupWithForm
          name='delete-card'
          title='Are you sure you want to delete it?'
          subtitle='There is no way to restore it'
          id='form-delete-card'
          formName='delete-place-card'
          buttonTextConfirm='Delete'
          buttonText='Canсel'
          onSubmit={handleSubmitEvent}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}

      {location.pathname === '/audience' && (
        <PopupWithForm
          name='delete-card'
          title='Are you sure you want to delete it?'
          subtitle='There is no way to restore it'
          id='form-delete-card'
          formName='delete-place-card'
          buttonTextConfirm='Delete'
          buttonText='Canсel'
          onSubmit={handleSubmitAudience}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
}

export default PopupDeleteCardConfirm;