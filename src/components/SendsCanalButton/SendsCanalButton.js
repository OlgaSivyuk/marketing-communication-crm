import React from 'react';

function SendsCanalButton ({ testClick, eventId, phone }) {

    return (
      <>
        <button
              className='tableau__button tableau__button_type-test'
              onClick={() => testClick(eventId, phone)}
            >
              Test
            </button>
      </>
    );
};

export default SendsCanalButton;