import React, { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Multiselect } from 'multiselect-react-dropdown'
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './PopupCreateNewAudience.css'
import { dataCategory } from '../../utils/constants'

function PopupCreateNewAudience ({ isOpen, onClose, createAudience, changeAudienceHandler, onChangeCategory }){

const [options] = useState(dataCategory);
const multiselectRefCategory = useRef();

const [isSubmitted, setIsSubmitted] = useState(false);
const [isCategorySelected, setIsCategorySelected] = useState(false);
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
    category: '',
    selectfieldcategory: ''
  },
});

function resetSelectFieldCategory() {
  multiselectRefCategory.current.resetSelectedValues();
};

function onSelect(selected) {
  onChangeCategory(selected);
  setValue('category', selected);
  setIsCategorySelected(true);
};

function onRemove(selected) {
  setValue('category', selected);
  setIsCategorySelected(multiselectRefCategory.current.getSelectedItems().length > 0);
};


function onSubmit(data) {
  if (!isCategorySelected && !multiselectRefCategory.current.getSelectedItems().length > 0) {
    setIsSubmitted(true);
    errors.category = 'Поле не может быть пустым';
    return;
  } else {
    setIsSubmitted(false);
  };
  setIsCategorySelected(multiselectRefCategory.current.getSelectedItems().length > 0);
  errors.category = undefined;
  createAudience(data);
  resetSelectFieldCategory();
  reset();
};

function onCategoryBlur() {
  setShowCategoryError(multiselectRefCategory.current.getSelectedItems().length === 0 && errors.category);
};

    return (
      <PopupWithForm
        name="new-audience"
        title="Добавить аудиторию"
        id="new-audience"
        formName="new-audience"
        buttonTextConfirm="Добавить аудиторию"
        onSubmit={handleSubmit(onSubmit)}
        isOpen={isOpen}
        onClose={onClose}
        reset={reset}
        resetSelectFieldCategory={resetSelectFieldCategory}
      >
        <fieldset className="popup__form-fields">
          <label className="popup__form-title"></label>
          <input
            {...register("name", {
              required: "Поле не может быть пустым",
            })}
            placeholder="Название аудитории"
            className={`popup__form-input ${
              errors?.name ? "popup__form-input_error" : ""
            }`}
            type="text"
            id="new-audience"
            name="name"
            // value={valueAudience.name}
            onChange={(e) => changeAudienceHandler(e.target.value, "name")}
          ></input>
          {errors?.name && (
            <span className="popup__error" type="text">
              {errors?.name?.message}
            </span>
          )}
        </fieldset>

        <fieldset className="popup__form-fields">
          <label className="popup__form-title"></label>
          <Controller
            name="category"
            control={control}
            rules={{ required: "Поле не может быть пустым" }}
            errors={errors.category}
            render={({ field: { ref, ...field } }) => {
              return (
                <Multiselect
                  {...field}
                  inputRef={ref}
                  ref={multiselectRefCategory}
                  displayValue="category"
                  onSelect={onSelect}
                  onRemove={onRemove}
                  options={options}
                  showCheckbox="true"
                  hidePlaceholder="true"
                  placeholder="Выберите категорию"
                  showArrow="true"
                  emptyRecordMsg="Таких категорий нет"
                  onBlur={onCategoryBlur}
                />
              );
            }}
          />
          <span className="popup__error" type="text">
            {errors?.category?.message}
          </span>
        </fieldset>
      </PopupWithForm>
    );
}

export default PopupCreateNewAudience;