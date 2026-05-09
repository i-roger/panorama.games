import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'r36s-theme'

type Theme = 'dark' | 'light'

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'dark' || stored === 'light') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

const initialTheme = getInitialTheme()
applyTheme(initialTheme)

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }, [])

  const setThemeExplicit = useCallback((t: Theme) => {
    setTheme(t)
    localStorage.setItem(STORAGE_KEY, t)
  }, [])

  return { theme, setTheme: setThemeExplicit, toggle }
}
