import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

export const lightColors = {
  primary: '#00205B', // UPS Blue (PANTONE 281 CVU)
  secondary: '#F2A900', // UPS Yellow (PANTONE 130 CVU)
  text: {
    dark: '#403F3B',
    light: '#807D7E',
  },
  background: {
    main: '#F3F7FB',
    card: '#FFFFFF',
    alt: '#F0F0F0',
  },
  button: {
    primary: '#0065B0',
    primaryDark: '#07508E',
  },
  border: '#E0E0E0',
  error: '#D32F2F',
  success: '#388E3C',
  warning: '#F57C00',
  info: '#1976D2',
};

export const darkColors = {
  primary: '#00205B', // UPS Blue
  secondary: '#F2A900', // UPS Yellow
  text: {
    dark: '#F3F7FB', // Inverted text
    light: '#B0B4BA',
  },
  background: {
    main: '#121212', // Dark background
    card: '#1E1E1E', // Dark card
    alt: '#2C2C2C',
  },
  button: {
    primary: '#0065B0',
    primaryDark: '#07508E',
  },
  border: '#333333',
  error: '#EF5350',
  success: '#66BB6A',
  warning: '#FFA726',
  info: '#42A5F5',
};

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: typeof lightColors;
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
  colors: lightColors,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
