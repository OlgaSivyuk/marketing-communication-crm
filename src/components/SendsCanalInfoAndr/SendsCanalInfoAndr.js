import React from 'react';
import SendsCanalButton from '../SendsCanalButton/SendsCanalButton';

function SendsCanalInfoAnd ({ 
  event, 
  changeEventHandler,  
  pushTestClick, 
  canalName, 
  eventId 
}) {

    return (
      <div className='tableau__cell-wrapper send-chanel-1'>
      <div className='tableau__cell_send-chanel'>
        <h2 className='tableau__cell-title'>Android Push</h2>
        <fieldset className='tableau__cell-fields'>
          <label className='tableau__input-title'>
            Предварительный объем
          </label>
          <p className='tableau__cell-text'>{event.value}</p>
        </fieldset>
        <fieldset className='tableau__cell-fields'>
          <label className='tableau__input-title'>Финальный объем</label>
          <p className='tableau__cell-text'>{event.finalValue}</p>
        </fieldset>
        <fieldset className='tableau__cell-fields fields_type-changeble'>
          <label className='tableau__input-title'>Deeplink</label>
          <input
            className='tableau__cell-input'
            type='text'
            id='deeplink'
            name='deeplink'
            placeholder='Deeplink'
            value={event.deeplinkAndroid}
            onChange={(e) =>
              changeEventHandler(e.target.value, 'deeplinkAndroid')
            }
            required
          ></input>
        </fieldset>
        <fieldset className='tableau__cell-fields fields_type-changeble'>
          <label className='tableau__input-title'>Текст для Deeplink</label>
          <input
            className='tableau__cell-input'
            type='text'
            id='text-deeplink'
            name='text-deeplink'
            placeholder='Текст для Deeplink'
            value={event.textAndroid}
            onChange={(e) => changeEventHandler(e.target.value, 'textAndroid')}
            required
          ></input>
        </fieldset>

          <SendsCanalButton 
           testClick={pushTestClick}
           canalName={canalName}
           eventId={eventId}
           />    
      </div>
    </div>
    );
};

export default SendsCanalInfoAnd;