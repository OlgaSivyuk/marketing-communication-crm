import React from 'react';
import './CalenderWeekDaysHeader.css';
import moment from 'moment';

function CalenderWeekDaysHeader() {
    return (
      <>
        {[...Array(7)].map((_, i) => (
            <div
              className='callender__cell-wrapper calender__cell-wrapper_days-name '
              key={i}
             >
              <div className='callender__cell_day-name'>
                {moment()
                  .day(i + 1)
                  .format('ddd')}
              </div>
            </div>
          ))}
      </>
    );
};

export default CalenderWeekDaysHeader;