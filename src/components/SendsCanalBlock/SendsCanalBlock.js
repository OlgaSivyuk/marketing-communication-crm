import React from 'react';
import SendsCanalInfoAnd from '../SendsCanalInfoAndr/SendsCanalInfoAndr';
import SendsCanalInfoEmail from '../SendsCanalInfoiEmail/SendsCanalInfoiEmail';
import SendsCanalInfoiOs from '../SendsCanalInfoiOs/SendsCanalInfoiOs';

function SendsCanalBlock ({ 
  event, 
  changeEventHandler, 
  pushTestClick, 
  emailTestClick, 
  canalName, 
  eventId 
}) {

    return (
      <>
        <SendsCanalInfoAnd
          canalName={canalName}
          event={event}
          changeEventHandler={changeEventHandler}
          pushTestClick={pushTestClick}
          eventId={eventId}
        />

        <SendsCanalInfoiOs
          canalName={canalName}
          event={event}
          changeEventHandler={changeEventHandler}
          pushTestClick={pushTestClick}
          eventId={eventId}
        />

        <SendsCanalInfoEmail
          canalName={canalName}
          event={event}
          changeEventHandler={changeEventHandler}
          emailTestClick={emailTestClick}
          eventId={eventId}
        />
      </>
    );
};
export default SendsCanalBlock;