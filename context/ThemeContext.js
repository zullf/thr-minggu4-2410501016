import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark(!isDark);
  const colors = {
    background: isDark ? '#121212' : '#F7F8FA', 
    card:       isDark ? '#1E1E1E' : '#FFFFFF',
    text:       isDark ? '#FFFFFF' : '#111111', 
    subtext:    isDark ? '#AAAAAA' : '#888888', 
    border:     isDark ? '#333333' : '#F0F0F0', 
    navBg:      isDark ? '#2C2C2C' : '#000000', 
    primaryBg:  isDark ? '#FFFFFF' : '#000000',
    primaryText:isDark ? '#000000' : '#FFFFFF',
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};
