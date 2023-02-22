import React from 'react';

function SendsInfo({ event }) {

    return (
        <div className='tableau__cell-wrapper send-info'>
          <div className='tableau__cell_send-info'>
            <fieldset className='tableau__cell-fields'>
              <label className='tableau__input-title'>Id рассылки</label>
              <p className='tableau__cell-text'>{event.id}</p>
            </fieldset>
            <fieldset className='tableau__cell-fields'>
              <label className='tableau__input-title'>Название</label>
              <p className='tableau__cell-text'>{event.name}</p>
            </fieldset>
            <fieldset className='tableau__cell-fields'>
              <label className='tableau__input-title'>Аудитории</label>
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