import React from 'react'
import { useLocation } from 'react-router-dom';
import DownloadReportCurrent from '../DownloadReportCurrent/DownloadReportCurrent';
import './Title.css';

function Title({
  today,
  showPreviousMonth,
  showCurrentMonth,
  showNextMonth,
  openAddNewSendsForm,
  openAddNewAudienceForm,
  previousPage, 
  canPreviousPage, 
  pageIndex, 
  pageOptions, 
  nextPage, 
  canNextPage, 
  
  event
}) {
  const location = useLocation();

  return (
    <section className='title'>

      {/* calender */}
      {location.pathname === '/calender' && (
        <>
          <h1 className='title__title'>Campaign</h1>
          <div className='title__tools'>
            <div className='title__slider'>
              <button
                className='title__button-arrow title__button-arrow-left'
                type='button'
                aria-label='предыдущий месяц'
                onClick={showPreviousMonth}
              ></button>

              <button
                className='title__button-current'
                type='button'
                aria-label='текущий месяц'
                onClick={showCurrentMonth}
              >
                {today.locale('en').format('MMMM')} {today.format('YYYY')}
              </button>

              <button
                className='title__button-arrow title__button-arrow-right'
                type='button'
                aria-label='предыдущий месяц'
                onClick={showNextMonth}
              ></button>
            </div>

            <button className='title__button' type='button' onClick={() => openAddNewSendsForm('Add Campaign', null, today)}>
            Add Campaign
            </button>
          </div>
        </>
      )}

      {/* Audiences */}
      {location.pathname === '/audience' && (
        <>
          <h1 className='title__title'>Audience</h1>
        <div className='title__tools'>
          <div className='title__slider'>
            <button
              className='title__button-arrow title__button-arrow-left'
              type='button'
              aria-label='предыдущая страница'
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            ></button>

            <button
              className='title__button-current'
              type='button'
              aria-label='количество страниц'
            >
              {' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
              {/* <span className='title__img'></span> */}
            </button>

            <button
              className='title__button-arrow title__button-arrow-right'
              type='button'
              aria-label='следующая страница'
              onClick={() => nextPage()}
              disabled={!canNextPage}
            ></button>
          </div>

          <button
            className='title__button'
            type='button'
            onClick={()=> openAddNewAudienceForm(null, today)}>
            Add Audience
          </button>
        </div>
        </>
      )}

      {/* Campaign */}
      {location.pathname === '/sends' && (
        <>
          <h1 className='title__title'>Editing Campaign</h1>
          < DownloadReportCurrent 
          event={event}
          />
        </>
      )}
    </section>
  );
}

export default Title;