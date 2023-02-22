import React from 'react';
import './CalendarMonthDaysList.css';
import { ITEMS_PER_DAY }  from '../../utils/constants';
import { isDayContainCurrentEvent } from '../../utils/constants'
import CalenderWeekDaysHeader from '../CalenderWeekDaysHeader/CalenderWeekDaysHeader';
import CalenderDay from '../CalenderDay/CalenderDay';

function CalendarMonthDaysList({ startDay, today, openAddNewSendsForm, events, openEditSendsForm }) {

    const day = startDay.clone().subtract(1, 'day'); // без subtract начинает день со вт
    const daysArray = [...Array(ITEMS_PER_DAY)].map(() => day.add(1, 'day').clone());

    return (
      <div className='calender__grid-wrapper'>
        
        <CalenderWeekDaysHeader />

        {daysArray.map((dayItem) => (
          <CalenderDay 
          key={dayItem.unix()}
          events={events.filter(event => isDayContainCurrentEvent(event, dayItem))}
          dayItem={dayItem}
          today={today}
          openAddNewSendsForm={openAddNewSendsForm}
          openEditSendsForm={openEditSendsForm}
          />
        ))}
      </div>
    );
};

export default CalendarMonthDaysList;