'use client';

import { createTheme, colorsTuple, virtualColor } from '@mantine/core';

type MantineThemePalette = readonly [string, string, string, string, string, string, string, string, string, string, ...string[]]

const emptyColor: string = '#FF00DC' // Used in color tuples as a placeholder, to signify there's no color there
const lightmode: MantineThemePalette = [emptyColor, emptyColor, emptyColor, emptyColor, '#E2DBC8', '#D1C2A7', '#C0A886', '#AD9674', '#9C8667', '#857258']
const darkmode: MantineThemePalette = ['#CBD9F4', '#B1BFD9', '#98A4BE', '#7E8AA3', '#647087', '#4A566C', '#313B51', '#172136', '#10182C', '#080F22']

export const theme = createTheme({
  /* Put your mantine theme override here */
  colors: {
    light: lightmode,
    dark: darkmode,
    primary_mission_header: colorsTuple('#385366'),
    primary: virtualColor({
      name: 'primary',
      light: 'light',
      dark: 'dark',
    }),
  },
  white: '#FFFFFF',
  black: '#2C2C2C',
  primaryShade: { light: 9, dark: 3 },
  primaryColor: 'primary'
});
