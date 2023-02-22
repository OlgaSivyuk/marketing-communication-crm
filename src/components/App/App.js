import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import CalenderGrid from '../CalenderGrid/CalenderGrid';
import SendsEditingTableau from '../SendsEditingTableau/SendsEditingTableau';
import AudienceTable from '../AudienceTable/AudienceTable';
import Settings from '../Settings/Settings';
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
  moment.locale('ru');
  moment.updateLocale('ru', { week: { dow: 1 } });
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
  const [event, setEvent] = useState(null); // event переменная для обновления
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
    if (location.pathname === '/') {
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

    fetch(`${BASE_URL}/settings`)
      .then((res) => res.json())
      .then((res) => {
        // console.log('settings data', res);
        setSetings(res);
      });

    fetch(`${BASE_URL}/report`)
      .then((res) => res.json());

    fetch(`${BASE_URL}/currentreport`)
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

  function openEditSendsForm(methodName, eventForUpdate) {
    navigate('/sends');
    setEvent(eventForUpdate);
    setMethod(methodName);
  };

  // добавление новой аудитории
  function openAddNewAudienceForm(audienceForCreate, dayItem) {
    setIsCreateNewAudiencePopupOpen(true);
    setAudience(
      audienceForCreate || { ...defaultAudience, date: dayItem.format('X') }
    );
  };

  // тестирование рассылки push
  function openPushTestForm(eventId, contactForCreate) {
    console.log('тестировать push', eventId);
    setPushIsTestingSendPopupOpen(true);
    setEvent(
      events.find((event) => {
        return eventId === event.id;
      })
    );
    setContact(contactForCreate);
  };

  // тестирование рассылки push
  function openEmailTestForm(eventId, contactForCreate) {
    console.log('тестировать email', eventId);
    setEmailIsTestingSendPopupOpen(true);
    setEvent(
      events.find((event) => {
        return eventId === event.id;
      })
    );
    setContact(contactForCreate);
  };

  // подстановка данных рассылки
  function setSettingsData(settingForUpdate) {
    setSeting(settingForUpdate);
  };

  // ================= логика изменения данных в модалках ==================
  // текстовое поле календарь
  function changeEventHandler(text, field) {
    setEvent((prevState) => ({
      ...prevState,
      [field]: text,
    }));
  };

  // поле дата и время
  function onChangeTime(time) {
    console.log('datetime', moment(time));
    setEvent((prevState) => ({
      ...prevState,
      date: moment(time).format('X'),
    }));
  };

  // мультивыбор аудитории
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

  //настройки
  function changeSettings(text, field) {
    console.log('field', text);
    setSeting((prevState) => ({
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
    console.log('удалить ивент', event);
    return Api.deleteEvent(event).then((res) => {
      console.log('res event', res);
      setEvents((prevState) =>
        prevState.filter((eventEl) => eventEl.id !== event.id)
      );
      closeAllPopups();
      navigate('/');
    });
  };

  // =================  аудитории работа с беком ==================
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
    console.log('удалить', audience);
    return Api.deleteAudience(audience).then((res) => {
      console.log('res audience', res);
      setAudiences((prevState) =>
        prevState.filter((eventEl) => eventEl.id !== audience.id)
      );
      closeAllPopups();
    });
  };

  // =================  тестирование рассылки ==================
  function sendTestMessage() {
    Api.sendTest(event, contact).then((res) => {
      console.log('тестовое сообщение', res);
    });

    closeAllPopups();
  };

  // =================  дополнительные действия ==================
  function deleteClick() {
    setIsDeleteConfirmPopupOpen(true);
    console.log('удалить');
  };

  function deleteAudienceClick(audienceId) {
    console.log('удалить', audienceId);
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

  function changeSettingsClick(settingId) {
    console.log('setting', settingId);
    setIsChangeSettingsPopupOpen(true);
    setSeting(
      settings.find((setting) => {
        return settingId === setting.id;
      })
    );
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
          path='/sends'
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
        <Route
          path='/settings'
          element={
            <Settings
              handleUpdateSettings={handleUpdateSettings}
              changeSettings={changeSettings}
              settings={settings}
              // checkSettingId={checkSettingId}
              setSettingsData={setSettingsData}
              changeSettingsClick={changeSettingsClick}
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
      {/* Модалка создания аудитории */}
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



//============== кусочек из изменения настроек
    // Api.getSettings()
    // .then((res) => {
    //   console.log('res', res)
    //   const mappedSettings = res.map((resSetting) => {
    //     return {
    //     policy: resSetting.policy,
    //     timeStart: resSetting.timeStart,
    //     timeEnd: resSetting.timeEnd,
    //     id: resSetting.id,
    //     canalName: resSetting.canalName
    //     }
    //   });
    //   setSeting(mappedSettings)
    //   console.log('mappedSettings', setting)

      // setSeting(mappedSettings.find((setting) => {
      //   return settingId === setting.id
      // }));
      // console.log('setting', setting.id)
    // })