import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface ThemeContextValue {
  showEasterEggs: boolean
  toggleEasterEggs: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  showEasterEggs: false,
  toggleEasterEggs: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [showEasterEggs, setShowEasterEggs] = useState(false)

  const toggleEasterEggs = useCallback(() => {
    setShowEasterEggs((prev) => !prev)
  }, [])

  return (
    <ThemeContext.Provider value={{ showEasterEggs, toggleEasterEggs }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
