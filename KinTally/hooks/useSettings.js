import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    darkMode: 'system', // 'light', 'dark', or 'system'
    primaryColor: '#3b82f6',
    fontSize: 'medium', // 'small', 'medium', 'large'
  });

  const setDarkMode = (mode) => {
    setSettings((prev) => ({ ...prev, darkMode: mode }));
  };

  const setPrimaryColor = (color) => {
    setSettings((prev) => ({ ...prev, primaryColor: color }));
  };

  const setFontSize = (size) => {
    setSettings((prev) => ({ ...prev, fontSize: size }));
  };

  return (
    <SettingsContext.Provider
      value={{ settings, setDarkMode, setPrimaryColor, setFontSize }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
