import React, { useState } from 'react';
import './SendsEditingTableau.css';
import Title from '../Title/Title';

import SendsStatusTableau from '../SendsStatusTableau/SendsStatusTableau';
import SendsInfo from '../SendsInfo/SendsInfo';
import SendsCurrentDate from '../SendsCurrentDate/SendsCurrentDate';
import * as Api from '../../utils/Api.js';
import moment from 'moment';
import SendsCanalBlock from '../SendsCanalBlock/SendsCanalBlock';


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
}) {
  const [actionButton, setActionButton] = useState('Send Campaign ');
  const [eventId] = useState(event.id);
  const [eventDate] = useState(
    moment.unix(+event.date).format('YYYY-MM-DD HH:mm')
  );

  function actionWithSends(actionName) {
    setActionButton(actionName);

    if (actionButton === 'Send Campaign ') {
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
              {method}
            </button>

            {actionButton === 'Send Campaign ' ? (
              <button
                className='tableau__button'
                onClick={() => actionWithSends('Остановить')}
              >
                {actionButton}
              </button>
            ) : (
              <button
                className='tableau__button'
                onClick={() => actionWithSends('Send Campaign ')}
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