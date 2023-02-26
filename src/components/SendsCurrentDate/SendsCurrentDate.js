import React from 'react';
import moment from 'moment';

function SendsCurrentDate({ event, onChangeTime }) {
    return (
      <div className='tableau__cell-wrapper send-date '>
        <div className='tableau__cell_send-date'>
          <fieldset className='tableau__cell-fields fields_type-changeble'>
            <label className='tableau__input-title'>Date and Time</label>
            <input
              className='tableau__cell-input input_type-date'
              type='datetime-local'
              id='date'
              name='date'
              value={moment.unix(+event.date).format('YYYY-MM-DD HH:mm')}
              required
              onChange={(e) => onChangeTime(e.target.value)}
            ></input>
          </fieldset>
        </div>
      </div>
    );
};

export default SendsCurrentDate;