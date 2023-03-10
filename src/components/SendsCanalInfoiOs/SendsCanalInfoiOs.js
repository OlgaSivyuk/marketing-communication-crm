import React from 'react';
import SendsCanalButton from '../SendsCanalButton/SendsCanalButton';

function SendsCanalInfoiOs ({ 
  event, 
  changeEventHandler,  
  pushTestClick, 
  canalName, 
  eventId 
}) {
    return (
      <div className='tableau__cell-wrapper send-chanel-2'>
        <div className='tableau__cell_send-chanel'>
          <h2 className='tableau__cell-title'>iOs Push</h2>
          <fieldset className='tableau__cell-fields'>
            <label className='tableau__input-title'>
              Preliminary Volume
            </label>
            <p className='tableau__cell-text'>400</p>
          </fieldset>
          <fieldset className='tableau__cell-fields'>
            <label className='tableau__input-title'>Final Volume</label>
            <p className='tableau__cell-text'>400</p>
          </fieldset>
          <fieldset className='tableau__cell-fields fields_type-changeble'>
            <label className='tableau__input-title'>Deeplink</label>
            <input
              className='tableau__cell-input'
              type='text'
              id='deeplink'
              name='deeplink'
              placeholder='Add Deeplink'
              value={event.deeplinkIos}
              onChange={(e) =>
                changeEventHandler(e.target.value, 'deeplinkIos')
              }
              required
            ></input>
          </fieldset>
          <fieldset className='tableau__cell-fields fields_type-changeble'>
            <label className='tableau__input-title'>Deeplink Text</label>
            <input
              className='tableau__cell-input'
              type='text'
              id='text-deeplink'
              name='text-deeplink'
              placeholder='Add Deeplink Text'
              value={event.textIos}
              onChange={(e) => changeEventHandler(e.target.value, 'textIos')}
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

export default SendsCanalInfoiOs;