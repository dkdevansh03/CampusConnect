import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeCtx = createContext(null)

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => localStorage.getItem('cc_dark') === '1')

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('cc_dark', '1')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('cc_dark', '0')
    }
  }, [dark])

  return <ThemeCtx.Provider value={{ dark, setDark }}>{children}</ThemeCtx.Provider>
}

export function useTheme() { return useContext(ThemeCtx) }
