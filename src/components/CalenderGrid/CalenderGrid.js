
import React from 'react';
import './CalenderGrid.css';
import Title from '../Title/Title';
import CalendarMonthDaysList from '../CalendarMonthDaysList/CalendarMonthDaysList';


function CalenderGrid({
  startDay,
  today,
  events,
  openAddNewSendsForm,
  openEditSendsForm,
  showPreviousMonth,
  showCurrentMonth,
  showNextMonth,
}) {
  
  return (
    <section className='calendar'>
      <Title 
      today={today}
      showPreviousMonth={showPreviousMonth}
      showCurrentMonth={showCurrentMonth}
      showNextMonth={showNextMonth}
      openAddNewSendsForm={openAddNewSendsForm}
      />

      <CalendarMonthDaysList 
      startDay={startDay}
      today={today}
      openAddNewSendsForm={openAddNewSendsForm}
      events={events}
      openEditSendsForm={openEditSendsForm}
      />
      
    </section>
  );
}
  
export default CalenderGrid;