import React, { useState} from 'react';
import * as Api from '../../utils/Api.js';
import moment from 'moment';

function DownloadReportCurrent({ event }) {

  const [eventId] = useState(event.id);
  const [eventDate] = useState(moment.unix(+event.date).format('YYYY-MM-DD HH:mm'));

  function handleGetReport() {
    console.log('id: ', eventId);
    console.log('date: ', eventDate);

    return Api.createCurrentReport(eventId, eventDate)
    .then((res) => {
      console.log('res', res);

    });
  };

   return (
        <div className='title__tools'>
            <button
              className='title__button title__button_type-report'
              type='button'
              onClick={handleGetReport}
            >
              Get Report
            </button>
        </div>
    );
};

export default DownloadReportCurrent;