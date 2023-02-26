import React from 'react';
import { useForm } from 'react-hook-form';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function PopupTestingSendEmail ({ isOpen, onClose, sendTestMessage, changePhoneHandler }){

    const {
      register,
      formState: { errors },
      reset,
      handleSubmit,
    } = useForm({
      mode: 'all',
      defaultValues: {
        email: '',
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
            <label className='popup__form-title'>Email</label>
            <input
            {...register('email', {
              required: 'Поле «Email» не может быть пустым',
              pattern: {
                value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
                message: 'Введите email в формате email@domen.com',
              },
            })}
            className={`popup__form-input ${
                errors?.email ? 'popup__form-input_error' : ''
              }`}
              type='email'
              id='email'
              placeholder='email@domen.com'
              onChange={e => changePhoneHandler(e.target.value, 'email')}
            ></input>
            {errors?.email && (
            <span className='popup__error' type='text'>
              {errors?.email?.message}
            </span>
          )}
          </fieldset>
        </PopupWithForm>
      );
}

export default PopupTestingSendEmail;