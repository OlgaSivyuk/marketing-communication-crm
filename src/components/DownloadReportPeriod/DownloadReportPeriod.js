import React from 'react';

function DownloadReportPeriod({ getReportClick }) {
    return (

        <li className='header__navigation-link'>
        <button className='header__button-link' onClick={getReportClick}>
          <span className='header__img header__img-report'></span>
          Отчет за период
        </button>
        </li>
    );
};

export default DownloadReportPeriod ;