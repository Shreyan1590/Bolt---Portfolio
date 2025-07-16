import React from 'react';
import { useThemeProvider } from '../hooks/useTheme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themeValue = useThemeProvider();
  
  return (
    <themeValue.ThemeContext.Provider value={themeValue}>
      {children}
    </themeValue.ThemeContext.Provider>
  );
};

export default ThemeProvider;