import React from 'react';
import { useForm } from 'react-hook-form';
import './SettingsCanalSettings.css'

function SettingsCanalSettings({ 
  changeSettings, 
  handleUpdateSettings, 
  setting, 
  // checkSettingId, 
  // setSettingsData, 
  // changeSettingsClick 
}) {

 
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    defaultValues: {
      policy: setting.policy,
      timeStart: setting.timeStart,
      timeEnd: setting.timeEnd,
    },
  });

  function onSubmit(settingId) {
    // checkSettingId(settingId);
    // changeSettingsClick(settingId)
    handleUpdateSettings(settingId);
    console.log('какой канал?', settingId )
  }

  return (
    <form onSubmit={handleSubmit(() => onSubmit(setting.id))}>
      <fieldset className='settings__cell-fields'>
        <label className='settings__input-title'>
          Коммуникационная политика
        </label>
        <input
          {...register('policy', { required: true, 
            pattern: {
              value: /[1-9]|/
            }, 
          })}
          className='settings__cell-input'
          type='text'
          id='policy'
          onChange={(e) => changeSettings(e.target.value, 'policy')}
        ></input>
            <label className='settings__input-subtitle'>
                Сколько отправлять в час пользователю
            </label>
          
      </fieldset>
      <fieldset className='settings__cell-fields'>
        <label className='settings__input-title'>Час начала отправки</label>
        <input
          {...register('timeStart', { required: true })}
          className='settings__cell-input input_type-time'
          type='time'
          id='time'
          min='00:00'
          max='23:59'
          onChange={(e) => changeSettings(e.target.value, 'timeStart')}
        ></input>
        <label className='settings__input-subtitle'>
          По местному времени пользователя
        </label>
      </fieldset>
      <fieldset className='settings__cell-fields'>
        <label className='settings__input-title'>Час окончания отправки</label>
        <input
          {...register('timeEnd', {
            required: true
          })}
          className='settings__cell-input input_type-time'
          type='time'
          id='time'
          min='00:00'
          max='23:59'
          onChange={(e) => changeSettings(e.target.value, 'timeEnd')}
        ></input>
        <label className='settings__input-subtitle'>
          По местному времени пользователя
        </label>
      </fieldset>
      <button
        className={`settings__button ${
          !isValid ? 'settings__button_disabled' : ''
        }`}
        type='submit'
        disabled={!isValid}
      >
        Изменить
      </button>
    </form>
  );
};

export default SettingsCanalSettings;
  