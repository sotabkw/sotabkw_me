import { useCallback, useEffect, useState } from 'react'

type UseSimpleDarkMode = (isDark?: boolean) => {
  isDarkMode: boolean
  toggle: (isDark?: boolean) => void
}

export const useSimpleDarkMode: UseSimpleDarkMode = (isInitialDark = true) => {
  const [isDarkMode, toggleTheme] = useState<boolean>(isInitialDark)
  const toggle = useCallback((isDark?) => {
    if (typeof isDark === 'undefined') {
      toggleTheme((state) => !state)
      return
    }

    toggleTheme(isDark)
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return { isDarkMode, toggle }
}
