import React from 'react';
import SendsCanalButton from '../SendsCanalButton/SendsCanalButton';

function SendsCanalInfoEmail ({ 
  event, 
  changeEventHandler, 
  emailTestClick, 
  canalName, 
  eventId 
}) {
  
    return (
      <div className='tableau__cell-wrapper send-chanel-3'>
        <div className='tableau__cell_send-chanel'>
          <h2 className='tableau__cell-title'>Email</h2>
          <fieldset className='tableau__cell-fields'>
            <label className='tableau__input-title'>
              Preliminary Volume
            </label>
            <p className='tableau__cell-text'>800</p>
          </fieldset>
          <fieldset className='tableau__cell-fields'>
            <label className='tableau__input-title'>Final Volume</label>
            <p className='tableau__cell-text'>800</p>
          </fieldset>
          <fieldset className='tableau__cell-fields fields_type-changeble'>
            <label className='tableau__input-title'>Main link</label>
            <input
              className='tableau__cell-input'
              type='text'
              id='link'
              name='link'
              placeholder='Add Main link'
              value={event.linkEmail}
              onChange={(e) => changeEventHandler(e.target.value, 'linkEmail')}
              required
            ></input>
          </fieldset>
          <fieldset className='tableau__cell-fields fields_type-changeble'>
            <label className='tableau__input-title'>Title</label>
            <input
              className='tableau__cell-input'
              type='text'
              id='text-title'
              name='text-title'
              placeholder='Add Title'
              value={event.textEmail}
              onChange={(e) => changeEventHandler(e.target.value, 'textEmail')}
              required
            ></input>
          </fieldset>

          <SendsCanalButton
            testClick={emailTestClick}
            canalName={canalName}
            eventId={eventId}
          />
        </div>
      </div>
    );
};

export default SendsCanalInfoEmail;