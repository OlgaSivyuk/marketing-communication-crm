import React from 'react';

function SendsInfo({ event }) {

    return (
        <div className='tableau__cell-wrapper send-info'>
          <div className='tableau__cell_send-info'>
            <fieldset className='tableau__cell-fields'>
              <label className='tableau__input-title'>Campaign ID</label>
              <p className='tableau__cell-text'>{event.id}</p>
            </fieldset>
            <fieldset className='tableau__cell-fields'>
              <label className='tableau__input-title'>Campaign Name</label>
              <p className='tableau__cell-text'>{event.name}</p>
            </fieldset>
            <fieldset className='tableau__cell-fields'>
              <label className='tableau__input-title'>Audiences</label>
              {event.audience.map((audienceName, i) => (
                <p className='tableau__cell-text' 
                  key={i}>
                  {audienceName.audienceName}
                </p>
              ))
              }
              
            </fieldset>
          </div>
        </div>
    );
};

export default SendsInfo;