import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import CalenderGrid from '../CalenderGrid/CalenderGrid';
import SendsEditingTableau from '../SendsEditingTableau/SendsEditingTableau';
import AudienceTable from '../AudienceTable/AudienceTable';
import PopupCreateNewSend from '../PopupCreateNewSend/PopupCreateNewSend';
import PopupTestingSendPhone from '../PopupTestingSendPhone/PopupTestingSendPhone';
import PopupTestingSendEmail from '../PopupTestingSendEmail/PopupTestingSendEmail';
import PopupCreateNewAudience from '../PopupCreateNewAudience/PopupCreateNewAudience';
import PopupDeleteCardConfirm from '../PopupDeleteConfirm/PopupDeleteConfirm';
import PopupPickDataRangeReport from '../PopupPickDataRangeReport/PopupPickDataRangeReport';

import { BASE_URL }  from '../../utils/Api';
import { ITEMS_PER_DAY }  from '../../utils/constants';
import * as Api from '../../utils/Api.js';

import moment from 'moment';
import 'moment/locale/ru';
import PopupChangeConfirm from '../PopupChangeConfirm/PopupChangeConfirm';


function App() {
  const navigate = useNavigate();
  const location = useLocation();

  window.moment = moment;
  moment.locale('en-US');
  moment.updateLocale('en-US', { week: { dow: 0 } });
  const [today, setToday] = useState(moment());
  const startDay = today.clone().startOf('month').startOf('week');
  const startDateQuery = startDay.clone().format('X');
  const endDateQuery = startDay.clone().add(ITEMS_PER_DAY, 'days').format('X');

  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false);
  const [isCreateNewSendPopupOpen, setIsCreateNewSendPopupOpen] = useState(false);
  const [isPushTestingSendPopupOpen, setPushIsTestingSendPopupOpen] = useState(false);
  const [isEmailTestingSendPopupOpen, setEmailIsTestingSendPopupOpen] = useState(false);
  const [isPickDataRangeReportPopupOpen, setIsPickDataRangeReportPopupOpen] = useState(false);
  const [isCreateNewAudiencePopupOpen, setIsCreateNewAudiencePopupOpen] = useState(false);
  const [isChangeSettingsPopupOpen, setIsChangeSettingsPopupOpen] = useState(false);

  const defaultEvent = {
    name: '',
    date: moment().format('X'),
    time: moment().format('X'),
    audience: [],
    canal: [],
    finalValue: '',
    value: '',
  };
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [method, setMethod] = useState(null);

  const defaultAudience = {
    name: '',
    // date_of_creation: moment().format('X'),
    date: moment().format('X'),
    date_of_update: moment().format('X'),
    value: '',
    deep: '',
    categorys: [],
  };
  const [audiences, setAudiences] = useState([]);
  const [audience, setAudience] = useState(null);

  const [contact, setContact] = useState(null);

  const [settings, setSetings] = useState([]);
  const [setting, setSeting] = useState(null);

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/marketing-communication-crm') {
      navigate('/calender');
    };

    fetch(
      `${BASE_URL}/events?date_gte=${startDateQuery}&date_lte=${endDateQuery}`
    )
      .then((res) => res.json())
      .then((res) => {
        setEvents(res);
      });

    fetch(`${BASE_URL}/audiences`)
      .then((res) => res.json())
      .then((res) => {
        setAudiences(res);
      });

    fetch(`${BASE_URL}/report`)
      .then((res) => res.json());

  }, [today, location.pathname, navigate]);

  // ================= календарь - даты ==================
  function showPreviousMonth() {
    setToday((prev) => prev.clone().subtract(1, 'month'));
    console.log('prev');
  }

  function showCurrentMonth() {
    setToday(moment());
    console.log('current');
  }

  function showNextMonth() {
    setToday((next) => next.clone().add(1, 'month'));
    console.log('next');
  }

  // ================= открытие модальных окон ==================
  // добавление новой рассылки и редактирование рассылки
  function openAddNewSendsForm(methodName, eventForCreate, dayItem) {
    // console.log('double click date', methodName);
    setIsCreateNewSendPopupOpen(true);
    setEvent(eventForCreate || { ...defaultEvent, date: dayItem.format('X') });
    setMethod(methodName);
  };

  function openEditSendsForm(methodName, eventForUpdate) { //methodName,
    // navigate(`/sends/${eventForUpdate.id}`);
    navigate('/sends');
    setEvent(eventForUpdate);
    setMethod(methodName);
  };

  // добавление новой Audiences
  function openAddNewAudienceForm(audienceForCreate, dayItem) {
    setIsCreateNewAudiencePopupOpen(true);
    setAudience(
      audienceForCreate || { ...defaultAudience, date: dayItem.format('X') }
    );
  };

  // Campaign Testing push
  function openPushTestForm(eventId, contactForCreate) {
    console.log('Test push', eventId);
    setPushIsTestingSendPopupOpen(true);
    setEvent(
      events.find((event) => {
        return eventId === event.id;
      })
    );
    setContact(contactForCreate);
  };

  // Campaign Testing push
  function openEmailTestForm(eventId, contactForCreate) {
    console.log('Test email', eventId);
    setEmailIsTestingSendPopupOpen(true);
    setEvent(
      events.find((event) => {
        return eventId === event.id;
      })
    );
    setContact(contactForCreate);
  };

  // ================= логика изменения данных в модалках ==================
  // текстовое поле календарь
  function changeEventHandler(text, field) {
    setEvent((prevState) => ({
      ...prevState,
      [field]: text,
    }));
  };

  // поле Date and Time
  function onChangeTime(date) {
    console.log('datetime', moment(date));
    setEvent((prevState) => ({
      ...prevState,
      date: moment(date).format('X'),
    }));
  };

  // мультивыбор Audiences
  function onChangeAudience(selectedItems) {
    console.log('selected audience', selectedItems);
    setEvent((prevState) => ({
      ...prevState,
      audience: selectedItems,
    }));
  };

  // мультивыбор канала
  function onChangeCanals(selectedItems) {
    console.log('selected canal', selectedItems);
    setEvent((prevState) => ({
      ...prevState,
      canal: selectedItems,
    }));
  };

  // текстовое поле аудитория
  function changeAudienceHandler(text, field) {
    console.log('text', text);
    setAudience((prevState) => ({
      ...prevState,
      [field]: text,
    }));
  };

  // мультивыбор категорий
  function onChangeCategory(selectedItems) {
    console.log('selected category', selectedItems);
    setAudience((prevState) => ({
      ...prevState,
      categorys: selectedItems,
    }));
  };

  // номер телефона/email для теста
  function changePhoneHandler(text, field) {
    console.log('телефон или имейл', text);
    setContact((prevState) => ({
      ...prevState,
      [field]: text,
    }));
  };

  // ================= настройки обновление ==================
  function handleUpdateSettings(settingId) {
    setSeting(
      settings.find((setting) => {
        return settingId === setting.id;
      })
    );
    console.log('setting', setting.id);

    if (setting.id === settingId) {
      return Api.updateSettings(setting)
        .then((res) => {
          console.log('update', res);

          setSetings((prevState) =>
            prevState.map((canalEl) => (canalEl.id === res.id ? res : canalEl))
          );
        })
        .catch((err) => console.log(`${err}`));
    } else {
      console.log('id не совпадают');
    }
  };

  // ================= календарь работа с беком ==================
  function handleCreateSend() {
    return Api.createEvent(event).then((res) => {
      console.log('res', res);
      setEvents((prevState) => [...prevState, res]);
      closeAllPopups();
      setEvent(null);
    });
  };

  function handleUpdateSend() {
    return Api.updateEvent(event)
      .then((res) => {
        console.log('res', res);
        setEvents((prevState) =>
          prevState.map((eventEl) => (eventEl.id === res.id ? res : eventEl))
        );
      })
      .catch((err) => console.error(`Ошибка...: ${err}`));
  };

  function handleRemoveEvent() {
    console.log('Delete ивент', event);
    return Api.deleteEvent(event).then((res) => {
      console.log('res event', res);
      setEvents((prevState) =>
        prevState.filter((eventEl) => eventEl.id !== event.id)
      );
      closeAllPopups();
      navigate('/');
    });
  };

  // =================  Audiences работа с беком ==================
  function createAudience() {
    console.log('создать аудиторию');
    return Api.createAudience(audience)
      .then((res) => {
        console.log('res audience', res);
        setAudiences((prevState) => [...prevState, res]);
        closeAllPopups();
        setAudience(null);
      })
      .catch((err) => console.error(`Ошибка...: ${err}`));
  };

  function removeAudience() {
    console.log('Delete', audience);
    return Api.deleteAudience(audience).then((res) => {
      console.log('res audience', res);
      setAudiences((prevState) =>
        prevState.filter((eventEl) => eventEl.id !== audience.id)
      );
      closeAllPopups();
    });
  };

  // =================  Campaign Testing ==================
  function sendTestMessage() {
    Api.sendTest(event, contact).then((res) => {
      console.log('тестовое сообщение', res);
    });

    closeAllPopups();
  };

  // =================  дополнительные действия ==================
  function deleteClick(eventId) {
    setIsDeleteConfirmPopupOpen(true);
    console.log('Delete', eventId);
  };

  function deleteAudienceClick(audienceId) {
    console.log('Delete', audienceId);
    setIsDeleteConfirmPopupOpen(true);
    setAudience(
      audiences.find((audience) => {
        return audienceId === audience.id;
      })
    );
  };

  function getReportClick() {
    setIsPickDataRangeReportPopupOpen(true);
  };


  function closeAllPopups() {
    setIsDeleteConfirmPopupOpen(false);
    setIsCreateNewSendPopupOpen(false);
    setPushIsTestingSendPopupOpen(false);
    setEmailIsTestingSendPopupOpen(false);
    setIsPickDataRangeReportPopupOpen(false);
    setIsCreateNewAudiencePopupOpen(false);
    setIsChangeSettingsPopupOpen(false);
  };

  return (
    <div className='page'>
      <Header getReportClick={getReportClick} />

      <Routes>
        <Route
          path='/calender'
          element={
            <CalenderGrid
              startDay={startDay}
              today={today}
              events={events}
              openAddNewSendsForm={openAddNewSendsForm}
              openEditSendsForm={openEditSendsForm}
              showPreviousMonth={showPreviousMonth}
              showCurrentMonth={showCurrentMonth}
              showNextMonth={showNextMonth}
            />
          }
        />
        <Route
          path='/sends'  //path='/sends/:id'
          element={
            <SendsEditingTableau
              deletSends={deleteClick}
              pushTestClick={openPushTestForm}
              emailTestClick={openEmailTestForm}
              event={event}
              changeEventHandler={changeEventHandler}
              handleUpdateSend={handleUpdateSend}
              method={method}
              onChangeTime={onChangeTime}
              events={events}
              setEvents={setEvents}
              startDateQuery={startDateQuery}
              endDateQuery={endDateQuery}
              setEvent={setEvent}
              defaultEvent={defaultEvent}
              navigate={navigate}
              location={location} 
            />
          }
        />
        <Route
          path='/audience'
          element={
            <AudienceTable
              openAddNewAudienceForm={openAddNewAudienceForm}
              deletAudience={deleteAudienceClick}
              audiences={audiences}
              setAudiences={setAudiences}
              today={today}
            />
          }
        />
      </Routes>

      {/* Модалка удаления карточки */}
      <PopupDeleteCardConfirm
        isOpen={isDeleteConfirmPopupOpen}
        onClose={closeAllPopups}
        confirmEventDelete={handleRemoveEvent}
        confirmAudienceDelete={removeAudience}
        audience={audience}
        event={event}
      />
      {/* Модалка изменения настроек */}
      <PopupChangeConfirm
        isOpen={isChangeSettingsPopupOpen}
        onClose={closeAllPopups}
        handleUpdateSettings={handleUpdateSettings}
        setting={setting}
      />
      {/* Модалка создания новой рассылки */}
      <PopupCreateNewSend
        isOpen={isCreateNewSendPopupOpen}
        onClose={closeAllPopups}
        handleCreateSend={handleCreateSend}
        changeEventHandler={changeEventHandler}
        method={method}
        onChangeTime={onChangeTime}
        audiences={audiences}
        onChangeAudience={onChangeAudience}
        onChangeCanals={onChangeCanals}
      />
      {/* Модалка тестирования пушей */}
      <PopupTestingSendPhone
        isOpen={isPushTestingSendPopupOpen}
        onClose={closeAllPopups}
        sendTestMessage={sendTestMessage}
        changePhoneHandler={changePhoneHandler}
      />
      {/* Модалка тестирования имейлов */}
      <PopupTestingSendEmail
        isOpen={isEmailTestingSendPopupOpen}
        onClose={closeAllPopups}
        sendTestMessage={sendTestMessage}
        changePhoneHandler={changePhoneHandler}
      />
      {/* Модалка выгрузка отчета за период */}
      <PopupPickDataRangeReport
        isOpen={isPickDataRangeReportPopupOpen}
        onClose={closeAllPopups}
      />
      {/* Модалка создания Audiences */}
      <PopupCreateNewAudience
        isOpen={isCreateNewAudiencePopupOpen}
        onClose={closeAllPopups}
        changeAudienceHandler={changeAudienceHandler}
        createAudience={createAudience}
        onChangeCategory={onChangeCategory}
      />
    </div>
  );
}

export default App;