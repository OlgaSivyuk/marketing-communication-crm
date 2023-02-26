import React from 'react';
import { useForm } from 'react-hook-form';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function PopupTestingSendPhone ({ isOpen, onClose, sendTestMessage, changePhoneHandler }){

    const {
      register,
      formState: { errors },
      reset,
      handleSubmit,
    } = useForm({
      mode: 'all',
      defaultValues: {
        phone: '',
      },
    });

    function onSubmit() {
      sendTestMessage();
      reset();
    }

    return (
        <PopupWithForm
          name='test-send'
          title='Campaign Testing'
          subtitle='Контент берется из основного окна. После внесения изменений, необходимо Save Changes перед тестированием, т.к. данные берутся из БД.'
          id='form-test-send'
          formName='test-send'
          buttonTextConfirm='Test'
          onSubmit={handleSubmit(onSubmit)}
          isOpen={isOpen}
          onClose={onClose}
        >
          <fieldset className='popup__form-fields'>
            <label className='popup__form-title'>Номер телефона</label>
            <input
            {...register('phone', {
              required: 'Поле «Телефон» не может быть пустым',
              pattern: {
                value: /^((\+7|7|8)+([0-9]){10})$/,
                message: 'Введите данные в формате +7900000000',
              },
            })}
            className={`popup__form-input ${
                errors?.phone ? 'popup__form-input_error' : ''
              }`}
              type='tel'
              id='phone'
              placeholder='+79000000000'
              onChange={e => changePhoneHandler(e.target.value, 'phone')}
            ></input>
            {errors?.phone && (
            <span className='popup__error' type='text'>
              {errors?.phone?.message}
            </span>
          )}
          </fieldset>
        </PopupWithForm>
      );
}

export default PopupTestingSendPhone;