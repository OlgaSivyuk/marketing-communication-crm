import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './SendsEditingTableau.css';
import Title from '../Title/Title';

import SendsStatusTableau from '../SendsStatusTableau/SendsStatusTableau';
import SendsInfo from '../SendsInfo/SendsInfo';
import SendsCurrentDate from '../SendsCurrentDate/SendsCurrentDate';
import * as Api from '../../utils/Api.js';
import moment from 'moment';
import SendsCanalBlock from '../SendsCanalBlock/SendsCanalBlock';
import { BASE_URL }  from '../../utils/Api';


function SendsEditingTableau({
  deletSends,
  pushTestClick,
  emailTestClick,
  event,
  changeEventHandler,
  handleUpdateSend,
  method,
  onChangeDate,
  onChangeTime,
  events,
  startDateQuery,
  endDateQuery,
}) {
  const [actionButton, setActionButton] = useState('Send Campaign');
  const [updatedData, setUpdatedData] = useState(null);
  
  const [eventId] = useState(event.id);
  const [eventDate] = useState(
    moment.unix(+event.date).format('YYYY-MM-DD HH:mm')
  );
  console.log("method", method)

  const {id} = useParams();

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch(`${BASE_URL}/events?date_gte=${startDateQuery}&date_lte=${endDateQuery}`);
  //     const data = await response.json();
  //     const currentEvent = data.find((item) => item.id === Number(id));
  //     // const updatedEventData = { ...currentEvent, date: moment(currentEvent.date).unix() };
  //     setUpdatedData(currentEvent);
  //     console.log('currentEvent', currentEvent);
  //     console.log('data', data);
  //   }
  //   fetchData();
  
  // }, [id, startDateQuery, endDateQuery]);
  
  // if (!updatedData) {
  //   return <div>Loading...</div>;
  // }

  function actionWithSends(actionName) {
    setActionButton(actionName);

    if (actionButton === 'Send Campaign') {
      return Api.sendSend(eventId, eventDate).then((res) => {
        console.log('рассылка отправлена', res);
      });
    } else {
      return Api.stopSend(eventId, eventDate).then((res) => {
        console.log('рассылка оcтановлена', res);
      });
    }
  }

  return (
    <section className='tableau'>
      <Title event={event} />
      <div className='tableau__grid-wrapper'>
        <SendsInfo event={event} />

        <SendsCurrentDate
          event={event}
          onChangeDate={onChangeDate}
          onChangeTime={onChangeTime}
        />

        <SendsStatusTableau />

        {event.canal.map((canalName, canalItem) => (
          <SendsCanalBlock
            key={canalItem}
            canalItem={canalItem}
            canalName={canalName.canal}
            eventCanal={event.canal}
            event={event}
            eventId={eventId}
            changeEventHandler={changeEventHandler}
            pushTestClick={pushTestClick}
            emailTestClick={emailTestClick}
          />
        ))}

        <div className='tableau__cell-wrapper button-area'>
          <div className='tableau__cell_buttons'>
            <button
              className='tableau__button tableau__button_type-save'
              onClick={handleUpdateSend}
            >
              <span className='button__img button__img-edit'></span>
              Save Changes
            </button>

            {actionButton === 'Send Campaign' ? (
              <button
                className='tableau__button'
                onClick={() => actionWithSends('Stop Campaign')}
              >
                {actionButton}
              </button>
            ) : (
              <button
                className='tableau__button'
                onClick={() => actionWithSends('Send Campaign')}
              >
                {actionButton}
              </button>
            )}

            <button
              className='tableau__button tableau__button_type-delete'
              onClick={deletSends}
            >
              <span className='button__img button__img-delete'></span>
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SendsEditingTableau;