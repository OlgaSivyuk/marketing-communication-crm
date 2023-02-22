import React, { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './PopupPickDataRangeReport.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import * as Api from '../../utils/Api.js';
import moment from 'moment';

function PopupPickDataRangeReport ({ isOpen, onClose }){
  
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());

  const selectionRange = {
    startDate: moment(startDate).format('X'),
    endDate: endDate,
    applyLabel: 'Установить',
    cancelLabel: 'Отменить',
    key: 'selection',
  };

  function handleGetReport() {
    console.log('startDate: ', startDate);
    console.log('endDate: ', endDate);

    return Api.createDataRangeReport(startDate, endDate).then((res) => {
      console.log('res', res);
      onClose();
    });
  }

  function handleSelect(ranges) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }

    return (
        <PopupWithForm
          name='report'
          title='Отчет за период'
          id='report'
          formName='report'
          buttonTextConfirm='Получить отчет'
          onSubmit={handleGetReport}
          isOpen={isOpen}
          onClose={onClose}
        >
          <fieldset className='popup__form-fields'>
            <label className='popup__form-title'>Период</label>
            <DateRangePicker 
            ranges={[selectionRange]} 
            onChange={handleSelect}
            >
            <input
              className='popup__form-input input_type-date-report'
              type='text'
              id='report'
              name='report'
              required
            ></input>
            </DateRangePicker>
          </fieldset>
          
        </PopupWithForm>
      );
}

export default PopupPickDataRangeReport;