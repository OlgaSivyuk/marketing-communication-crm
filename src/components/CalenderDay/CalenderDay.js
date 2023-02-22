import React, { useState } from 'react';
import './CalenderDay.css';
import CalendarEventsList from '../CalendarEventsList/CalendarEventsList';
import CalendarEventListButton from '../CalendarEventListButton/CalendarEventListButton';
import { isCurrentDay, isSelectedMonth } from '../../utils/constants';

function CalenderDay({
  dayItem,
  today,
  openAddNewSendsForm,
  events,
  openEditSendsForm,
}) {
  const [isListCell, setIsListCell] = useState('short');

  function showFullList() {
    console.log('clicked full');
    setIsListCell('full');
  }

  function showShortList() {
    console.log('clicked short');
    setIsListCell('short');
  }

  return (
    <div
      className={`callender__cell-wrapper ${
        isSelectedMonth(dayItem, today)
          ? ''
          : 'callender__cell-wrapper_prev-month'
      }`}
    >
      <div
        className='callender__cell-row current-day'
        onDoubleClick={() =>
          openAddNewSendsForm('Добавить рассылку', null, dayItem)
        }
      >
        <div
          className={`callender__day-wrapper ${
            isCurrentDay(dayItem) ? 'callender__day-wrapper_current-day' : ''
          }`}
        >
          {dayItem.format('D')}
        </div>
      </div>

      {/* в ul фильтруем элементы массива CalendarMonthDaysList и проверяем вхождение в диапозон начала дня и конца, первый и последний дивчик убираем */}
      {isListCell === 'short' ? (
        <ul className='callender__event-list-wrapper'>
          {events.slice(0, 3).map((event) => (
            <CalendarEventsList
              key={event.id}
              event={event}
              openEditSendsForm={openEditSendsForm}
            />
          ))}
          {events.length > 3 ? (
            <CalendarEventListButton
              setIsListCell={setIsListCell}
              isListCell={isListCell}
              showFullList={showFullList}
            />
          ) : null}
        </ul>
      ) : null}

      {isListCell === 'full' ? (
        <ul
          className={`callender__event-list-wrapper ${
            events.length > 3 ? 'callender__event-list-wrapper_shadow' : ''
          } `}
        >
          {events.map((event) => (
            <CalendarEventsList
              key={event.id}
              event={event}
              openEditSendsForm={openEditSendsForm}
              events={events}
            />
          ))}
          {events.length > 3 ? (
            <CalendarEventListButton
              setIsListCell={setIsListCell}
              isListCell={isListCell}
              showShortList={showShortList}
            />
          ) : null}
        </ul>
      ) : null}
    </div>
  );
};

export default CalenderDay;