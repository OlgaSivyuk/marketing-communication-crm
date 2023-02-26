import React, { useState, useRef } from 'react';
import { Multiselect } from 'multiselect-react-dropdown'
import { useForm, Controller } from 'react-hook-form';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './PopupCreateNewSend.css'
import { dataCanals } from '../../utils/constants'


function PopupCreateNewSend ({ isOpen, onClose, handleCreateSend, changeEventHandler, method, onChangeTime, audiences, onChangeAudience, onChangeCanals}){

  const dataAudience = [...audiences].map((audience) =>{ return {audienceName: audience.name+''}})
  const [optionscanal] = useState(dataCanals);

  const multiselectRefCanal = useRef();
  const multiselectRefAudience = useRef();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCanalSelected, setIsCanalSelected] = useState(false);
  const [isAudienceSelected, setIsAudienceSelected] = useState(false);
  const [showCategoryError, setShowCategoryError] = useState(false);

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
      canal: '',
      audience: '',
      selectfieldcanal: '',
      selectfieldAudience: ''

    },
  });

  function resetSelectFieldCanal() {
    multiselectRefCanal.current.resetSelectedValues();
  }

  function resetSelectFieldAudience() {
    multiselectRefAudience.current.resetSelectedValues();
  };

  function onSelectAudience(selected) {
    // console.log('выбран вариант', selected);
    onChangeAudience(selected);
    setValue('audienceName', selected);
    setIsAudienceSelected(true);
  };

  function onRemoveAudience(selected) {
    // console.log('удален вариант', selected );
    setValue('audienceName', selected);
    setIsAudienceSelected(multiselectRefAudience.current.getSelectedItems().length > 0);
  };

  function onSelectCanal(selected) {
    // console.log('выбран вариант', selected);
    onChangeCanals(selected);
    setValue('canal', selected);
    setIsCanalSelected(true);
    
  };

  function onRemoveCanal(selected) {
    // console.log('удален вариант', selected );
    setValue('canal', selected);
    setIsCanalSelected(multiselectRefCanal.current.getSelectedItems().length > 0);
  };

  function onSubmit(data) {
    if (!isCanalSelected && !isAudienceSelected && !multiselectRefCanal.current.getSelectedItems().length > 0 && !multiselectRefAudience.current.getSelectedItems().length > 0) {
      setIsSubmitted(true);
      errors.category = 'This field cannot be empty';
      return;
    } else {
      setIsSubmitted(false);
    };

    handleCreateSend(data);
    reset();
    resetSelectFieldCanal();
    resetSelectFieldAudience();

    setIsAudienceSelected(multiselectRefCanal.current.getSelectedItems().length > 0);
    setIsCanalSelected(multiselectRefAudience.current.getSelectedItems().length > 0);
    errors.category = undefined;
  }

    return (
      <PopupWithForm
        name='new-sand'
        title='Add Campaign'
        id='form-add-new-send'
        formName='add-new-send'
        buttonTextConfirm={method}
        onSubmit={handleSubmit(onSubmit)}
        isOpen={isOpen}
        onClose={onClose}
        reset={reset}
        resetSelectFieldCanal={resetSelectFieldCanal}
        resetSelectFieldAudience={resetSelectFieldAudience}
      >
        <fieldset className='popup__form-fields'>
          <label className='popup__form-title'>Date and Time</label>
          <input
            {...register('time', {
              required: 'This field cannot be empty',
            })}
            placeholder=' '
            className={`popup__form-input input_type-date ${
              errors?.time ? 'popup__form-input_error' : ''
            }`}
            type='datetime-local'
            format="yyyy-MM-ddThh:mm" 
            lang="en-US"
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
          <div className='popup__form-title'>Campaign Name</div>
          <input
            {...register('name', {
              required: 'This field cannot be empty',
              minLength: {
                value: 2,
                message: 'The name must contain at least 2 characters',
              },
              maxLength: {
                value: 30,
                message: 'The name cannot exceed 30 characters',
              },
            })}
            type='text'
            placeholder='Campaign Name'
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
          <div className='popup__form-title'>Channals</div>
            <Controller
            name='canal'
            control={control}
            rules={{ required: "This field cannot be empty" }}
            errors={errors.canal}
            render={({ field: { ref, ...field } }) => {
              return (
                <Multiselect
                  {...field}
                  inputRef={ref}
                  ref={multiselectRefCanal}
                  displayValue='canal'
                  onSelect={onSelectCanal}
                  onRemove={onRemoveCanal}
                  options={optionscanal}
                  showCheckbox='true'
                  hidePlaceholder='true'
                  placeholder='Select Channel'
                  showArrow='true'
                  emptyRecordMsg='There are no such channels'
                />
              );
            }}
          />
          <span className="popup__error" type="text">
            {errors?.canal?.message}
          </span>
        </fieldset>
        <fieldset className='popup__form-fields'>
          <div className='popup__form-title'>Audience</div>
          <Controller
            name='audienceName'
            control={control}
            rules={{ required: "This field cannot be empty" }}
            errors={errors.audienceName}
            render={({ field: { ref, ...field } }) => {
              // console.log(' {console.log(field)}', field);
              return (
                <Multiselect
                  {...field}
                  inputRef={ref}
                  ref={multiselectRefAudience}
                  displayValue='audienceName'
                  onSelect={onSelectAudience}
                  onRemove={onRemoveAudience}
                  options={dataAudience}
                  showCheckbox='true'
                  hidePlaceholder='true'
                  placeholder='Select Audience'
                  showArrow='true'
                  emptyRecordMsg='There is no such audience'
                  keepSearchTerm='false'
                />
              );
            }}
          />
          <span className="popup__error" type="text">
            {errors?.audienceName?.message}
          </span>
        </fieldset>
      </PopupWithForm>
    );
}

export default PopupCreateNewSend;