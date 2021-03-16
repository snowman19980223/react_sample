import React from 'react'
import {ThemeProvider as SCThemeProvider} from 'styled-components'
import defaultTheme from './theme'
import deepmerge from 'deepmerge' // TODO: review dependency

const DEFAULT_COLOR_MODE = 'day'
const DEFAULT_DAY_SCHEME = 'light'
const DEFAULT_NIGHT_SCHEME = 'dark'

type Theme = any
type ColorMode = 'day' | 'night'
type ColorModeWithAuto = ColorMode | 'auto'

export type ThemeProviderProps = {
  theme?: Theme
  colorMode?: ColorModeWithAuto
  dayScheme?: string
  nightScheme?: string
  children: React.ReactNode
}

function ThemeProvider({theme = defaultTheme, colorMode, dayScheme, nightScheme, children}: ThemeProviderProps) {
  const systemColorMode = useSystemColorMode()
  const colorScheme = getColorScheme(
    colorMode ?? DEFAULT_COLOR_MODE,
    dayScheme ?? DEFAULT_DAY_SCHEME,
    nightScheme ?? DEFAULT_NIGHT_SCHEME,
    systemColorMode
  )
  const resolvedTheme = applyColorScheme(theme, colorScheme)
  return <SCThemeProvider theme={resolvedTheme}>{children}</SCThemeProvider>
}

function useSystemColorMode() {
  const [systemColorMode, setSystemColorMode] = React.useState(getSystemColorMode)

  React.useEffect(() => {
    const media = window?.matchMedia?.('(prefers-color-scheme: dark)')

    function handleChange(event: MediaQueryListEvent) {
      const isNight = event.matches
      const systemColorMode = isNight ? 'night' : 'day'
      setSystemColorMode(systemColorMode)
    }

    // TODO: look into browser support
    media?.addEventListener('change', handleChange)

    return function cleanup() {
      media?.removeEventListener('change', handleChange)
    }
  }, [])

  return systemColorMode
}

function getSystemColorMode(): ColorMode {
  if (window?.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'night'
  }

  return 'day'
}

function getColorScheme(
  colorMode: ColorModeWithAuto,
  dayScheme: string,
  nightScheme: string,
  systemColorMode: ColorMode
) {
  switch (colorMode) {
    case 'auto':
      return systemColorMode === 'day' ? dayScheme : nightScheme
    case 'day':
      return dayScheme
    case 'night':
      return nightScheme
  }
}

function applyColorScheme(theme: Theme, colorScheme: string) {
  if (!theme.colorSchemes || !theme.colorSchemes[colorScheme]) {
    return theme
  }

  return deepmerge(theme, theme.colorSchemes[colorScheme])
}

export default ThemeProvider
