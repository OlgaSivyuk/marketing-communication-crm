
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
  event,
  showPreviousMonth,
  showCurrentMonth,
  showNextMonth,
  addNewAudience
}) {
  
  return (
    <section className='calendar'>
      <Title 
      event={event}
      today={today}
      showPreviousMonth={showPreviousMonth}
      showCurrentMonth={showCurrentMonth}
      showNextMonth={showNextMonth}
      openAddNewSendsForm={openAddNewSendsForm}
      addNewAudience={addNewAudience}
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