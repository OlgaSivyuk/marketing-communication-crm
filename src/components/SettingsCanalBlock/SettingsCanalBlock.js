import React from 'react';
import SettingsCanalSettings from '../SettingsCanalSettings/SettingsCanalSettings';
import './SettingsCanalBlock.css'

function SettingsCanalBlock({ 
  changeSettings, 
  handleUpdateSettings, 
  setting, 
  checkSettingId, 
  // changeSettingsClick 
}) {

  
    return (
      <div className='settings__cell-wrapper'>
        <div className='settings__cell_send-chanel'>

          <h2 className='settings__cell-title'>
           {setting.canalName}
          </h2>
          <SettingsCanalSettings
            changeSettings={changeSettings}
            handleUpdateSettings={handleUpdateSettings}
            setting={setting}
            checkSettingId={checkSettingId}
            setSettingsData={checkSettingId}
            // changeSettingsClick={changeSettingsClick}
            />
        </div>
      </div>
    );
};

export default SettingsCanalBlock;