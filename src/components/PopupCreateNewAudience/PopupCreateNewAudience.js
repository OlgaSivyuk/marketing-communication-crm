import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Multiselect } from 'multiselect-react-dropdown'
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './PopupCreateNewAudience.css'
import { dataCategory } from '../../utils/constants'

function PopupCreateNewAudience ({ isOpen, onClose, createAudience, changeAudienceHandler, onChangeCategory }){

const [options] = useState(dataCategory);

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
    deep: '',
    category: '',
    selectfieldcategory: ''
  },
});

function onSubmit(data) {
  createAudience(data);
  reset()
}

    return (
        <PopupWithForm
          name='new-audience'
          title='Добавить аудиторию'
          id='new-audience'
          formName='new-audience'
          buttonTextConfirm='Добавить аудиторию'
          onSubmit={handleSubmit(onSubmit)}
          isOpen={isOpen}
          onClose={onClose}
        >
          <fieldset className='popup__form-fields'>
            <label className='popup__form-title'></label>
            <input
            {...register('name', {
              required: 'Поле не может быть пустым',
            })}
              placeholder='Название аудитории'
              className={`popup__form-input ${
                errors?.name ? 'popup__form-input_error' : ''
              }`}
              type='text'
              id='new-audience'
              name='name'
              // value={valueAudience.name}
              onChange={e => changeAudienceHandler(e.target.value, 'name')}
            ></input>
            {errors?.name && (
            <span className='popup__error' type='text'>
              {errors?.name?.message}
            </span>
          )}
          </fieldset>
          
          <fieldset className='popup__form-fields'>
            <label className='popup__form-title'></label>
            <input
            {...register('deep', {
              required: 'Поле не может быть пустым',
            })}
              placeholder='Глубина'
              className={`popup__form-input ${
                errors?.deep ? 'popup__form-input_error' : ''
              }`}
              type='text'
              id='deep'
              name='deep'
              // value={valueAudience.name}
              onChange={e => changeAudienceHandler(e.target.value, 'deep')}
            ></input>
            {errors?.deep && (
            <span className='popup__error' type='text'>
              {errors?.deep?.message}
            </span>
          )}
          </fieldset>

          <fieldset className='popup__form-fields'>
          <label className='popup__form-title'></label>
            <Controller
            name='selectfieldcategory'
            control={control}
            rules={{ required: true }}
            errors='Поле «Категория» не может быть пустым'
            render={({ field: { ref, ...field }}) => {
            //  console.log(' {console.log(field)}', ref);
              return (
                <Multiselect
                  {...field}
                  inputRef={ref}
                  displayValue='category'
                  onSelect={(selected) => {
                    console.log('выбран вариант', selected);
                    onChangeCategory(selected)}}
                  onRemove={(selected) => {
                    console.log('удален вариант', selected );
                    setValue('selectfieldcategory', selected);
                    // onChangeCategory(selected);
                  }}
                  options={options}
                  showCheckbox='true'
                  hidePlaceholder='true'
                  placeholder='Выберите категорию'
                  showArrow='true'
                  emptyRecordMsg='Таких категорий нет'
                />
              );
            }}
          />
          {errors?.selectfieldcategory && (
            <span className='popup__error' type='text'>
              {errors?.selectfieldcategory?.message}
            </span>
          )}
        </fieldset>
        </PopupWithForm>
      );
}

export default PopupCreateNewAudience;