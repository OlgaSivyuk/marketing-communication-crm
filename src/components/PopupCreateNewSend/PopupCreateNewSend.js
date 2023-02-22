import React, { useState } from 'react';
import { Multiselect } from 'multiselect-react-dropdown'
import { useForm, Controller } from 'react-hook-form';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './PopupCreateNewSend.css'
import { dataCanals } from '../../utils/constants'


function PopupCreateNewSend ({ isOpen, onClose, handleCreateSend, changeEventHandler, method, onChangeTime, audiences, onChangeAudience, onChangeCanals}){

  const dataAudience = [...audiences].map((audience) =>{ return {audienceName: audience.name+''}})
  const [optionscanal] = useState(dataCanals);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    reset,
  } = useForm({
    mode: 'all',
    defaultValues: {
      name: '',
      date: '',
      time: '',
      canal: '',
      audience: '',
      selectfieldcanal: '',
      selectfieldAudience: ''

    },
  });

  function onSubmit(data) {
    handleCreateSend(data);
    reset()
  }

    return (
      <PopupWithForm
        name='new-sand'
        title='Добавить рассылку'
        id='form-add-new-send'
        formName='add-new-send'
        buttonTextConfirm={method}
        onSubmit={handleSubmit(onSubmit)}
        isOpen={isOpen}
        onClose={onClose}
      >
        <fieldset className='popup__form-fields'>
          <label className='popup__form-title'>Дата и Время</label>
          <input
            {...register('time', {
              required: 'Поле «Время» не может быть пустым',
            })}
            placeholder=' '
            className={`popup__form-input input_type-date ${
              errors?.time ? 'popup__form-input_error' : ''
            }`}
            type='datetime-local'
            id='datetime'
            onChange={e => onChangeTime(e.target.value)}
          ></input>
          {errors?.time && (
            <span className='popup__error' type='text'>
              {errors?.time?.message}
            </span>
          )}
        </fieldset>
        <fieldset className='popup__form-fields'>
          <div className='popup__form-title'>Название рассылки</div>
          <input
            {...register('name', {
              required: 'Поле «Название» не может быть пустым',
              minLength: {
                value: 2,
                message: 'Название должно содержать минимум 2 символа',
              },
              maxLength: {
                value: 30,
                message: 'Название не должно содержать более 30 символов',
              },
            })}
            type='text'
            placeholder='Название рассылки'
            onChange={e => changeEventHandler(e.target.value, 'name')}
            className={`popup__form-input ${
              errors?.name ? 'popup__form-input_error' : ''
            }`}>

          </input>
          {errors?.name && (
            <span className='popup__error' type='text'>
              {errors?.name?.message}
            </span>
          )}
        </fieldset>
        <fieldset className='popup__form-fields'>
          <div className='popup__form-title'>Каналы</div>
            <Controller
            name='selectfieldcanal'
            control={control}
            rules={{ required: true }}
            errors='Поле «Название» не может быть пустым'
            // required='Поле «Название» не может быть пустым'
            render={({ field: { ref, ...field } }) => {
              // console.log(' {console.log(field)}', field);
              return (
                <Multiselect
                  {...field}
                  inputRef={ref}
                  displayValue='canal'
                  onSelect={(selected) => onChangeCanals(selected)}
                  onRemove={(selected) => {
                    console.log('удален вариант', selected );
                    setValue('selectfieldcanal', selected);
                  }}
                  options={optionscanal}
                  showCheckbox='true'
                  hidePlaceholder='true'
                  placeholder='Выберите канал'
                  showArrow='true'
                  emptyRecordMsg='Таких каналов нет'
                />
              );
            }}
          />
          {errors?.selectfieldcanal && (
            <span className='popup__error' type='text'>
              {errors?.selectfieldcanal?.message}
            </span>
          )}
        </fieldset>
        <fieldset className='popup__form-fields'>
          <div className='popup__form-title'>Аудитории</div>
          <Controller
            name='audienceName'
            control={control}
            rules={{ required: true }}
            errors='Поле «Аудитоиия» не может быть пустым'
            render={({ field: { ref, ...field } }) => {
              // console.log(' {console.log(field)}', field);
              return (
                <Multiselect
                  {...field}
                  inputRef={ref}
                  displayValue='audienceName'
                  onSelect={(selected) => onChangeAudience(selected)}
                  onRemove={(selected) => {
                    console.log('удален вариант', selected );
                    setValue('audienceName', selected);
                  }}
                  options={dataAudience}
                  showCheckbox='true'
                  hidePlaceholder='true'
                  placeholder='Выберите аудиторию'
                  showArrow='true'
                  emptyRecordMsg='Такой аудитории нет'
                  keepSearchTerm='false'
                />
              );
            }}
          />
          {errors?.selectfieldAudience && (
            <span className='popup__error' type='text'>
              {errors?.selectfieldAudience?.message}
            </span>
          )}
        </fieldset>
      </PopupWithForm>
    );
}

export default PopupCreateNewSend;