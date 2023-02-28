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

  const location = useLocation();

  function handleSubmitEvent(event) {
    event.preventDefault();
    confirmEventDelete();
  };

  function handleSubmitAudience(event) {
    event.preventDefault();
    confirmAudienceDelete();
  };

  return (
    <>
      {location.pathname === '/sends' && (
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