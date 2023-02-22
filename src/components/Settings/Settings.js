import React from 'react'
import './Settings.css';
import Title from '../Title/Title';
import SettingsCanalBlock from '../SettingsCanalBlock/SettingsCanalBlock';

function Settings({ 
  changeSettings, 
  handleUpdateSettings, 
  checkSettingId, 
  settings, 
  setSettingsData, 
  changeSettingsClick
}) {

  return (
    <section className='settings'>
      <Title />

      <div className='settings__grid-wrapper'>
        {settings.map((setting, canalItem) => (
          <SettingsCanalBlock 
          key={setting.id}
          canalItem={canalItem}
          setting={setting}
          changeSettings={changeSettings}
          handleUpdateSettings={handleUpdateSettings}
          checkSettingId={checkSettingId}
          setSettingsData={setSettingsData}
          changeSettingsClick={changeSettingsClick} />
        ))}
      </div>
    </section>
  );
}

export default Settings