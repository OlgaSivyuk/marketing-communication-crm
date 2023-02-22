import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function PopupChangeConfirm ({ handleUpdateSettings, isOpen, onClose, setting}) {

    function handleSubmitSattingsChange(setting) {
        console.log('меняем настройки', setting )
        //event.preventDefault();
        handleUpdateSettings(setting);
      };

    return (
      <>
        <PopupWithForm
          name='delete-card'
          title='Точно изменить?'
          subtitle='Изменения сохранятся как дефолтные настройки канала'
          id='form-delete-card'
          formName='delete-place-card'
          buttonTextConfirm='Сохранить'
          buttonText='Отменить'
          onSubmit={() => handleSubmitSattingsChange(setting)}
          isOpen={isOpen}
          onClose={onClose}
        />
      </>
    );
};

export default PopupChangeConfirm;