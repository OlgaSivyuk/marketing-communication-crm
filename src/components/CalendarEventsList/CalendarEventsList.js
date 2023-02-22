import React from 'react';
import './CalendarEventsList.css';
import moment from 'moment';

function CalendarEventsList ({ event, openEditSendsForm }) {

    return (
      <>
        <li className='callender__event-item-wrapper'>
          <button
            className='callender__event'
            onDoubleClick={() =>
              openEditSendsForm('Сохранить изменения', event)
            }
          >
            {moment.unix(+event.date).format('HH:mm')} {event.name}
          </button>
        </li>
      </>
    );
};

export default CalendarEventsList;
