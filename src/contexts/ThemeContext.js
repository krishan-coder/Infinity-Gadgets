'use client';
import {React, useState, createContext, useEffect, useContext} from "react";

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if(context === undefined){
        throw new Error('useTheme must be used in Theme Provider');
    }
    return context;
}

export const ThemeProvider = ({children}) => {

    const [themes,setThemes] = useState({
  '': {
    bg: 'bg-white',
    text: 'text-gray-900',
    font: 'font-sans',
    accent: 'text-blue-600',
    lightText: 'text-gray-600',
    inputBg: 'bg-white',
    inputBorder: 'border-gray-300'
  },
  gaming: {
    bg: 'bg-gray-900',
    text: 'text-cyan-400',
    font: 'font-mono',
    accent: 'text-fuchsia-400',
    lightText: 'text-gray-400',
    inputBg: 'bg-gray-800',
    inputBorder: 'border-gray-700'
  },
  components: {
    bg: 'bg-blue-50',
    text: 'text-blue-900',
    font: 'font-serif',
    accent: 'text-blue-600',
    lightText: 'text-blue-500',
    inputBg: 'bg-white',
    inputBorder: 'border-blue-200'
  },
  accessories: {
    bg: 'bg-green-50',
    text: 'text-green-900',
    font: 'font-sans',
    accent: 'text-green-600',
    lightText: 'text-green-500',
    inputBg: 'bg-white',
    inputBorder: 'border-green-200'
  },
  commercial: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-900',
    font: 'font-mono',
    accent: 'text-yellow-600',
    lightText: 'text-yellow-500',
    inputBg: 'bg-white',
    inputBorder: 'border-yellow-200'
  }
});
    const [currentTheme, setTheme] = useState(themes['']);
    const changeTheme = (changeTheme) => {
        setTheme(themes[changeTheme]);
    }
    const value={currentTheme, changeTheme};
    return <ThemeContext.Provider value={value}>{ children }</ThemeContext.Provider>
}