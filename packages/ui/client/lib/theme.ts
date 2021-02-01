import { extendTheme, ThemeOverride } from '@chakra-ui/react';

const override: ThemeOverride = {
  fonts: {
    body: "'DM Sans', sans-serif",
    heading: "'DM Sans', sans-serif",
    mono: "'DM Mono', monospace",
  },
  fontSizes: {
    subtext: '0.75rem',
    base: '0.93rem',
    h4: '1.172rem',
    h3: '1.172rem',
    h2: '1.465rem',
    h1: '2.289rem',
  },
  fontWeights: {
    normal: 400,
    bold: 700,
  },
  colors: {
    // transparent: 'rgba(1, 1, 1, 0)',
    gesso: '#FFFFFF',
    drywall: '#F8F8F8',
    smudge: '#E8E9F1',
    concrete: '#9C9CA5',
    bruise: '#010024',
    tomato: '#FF3333',
    blackout: '#000000',
    highlight: '#0500FF',
    // success: '#00B733',
  },
  styles: {
    global: {
      body: {
        fontFamily: 'body',
        color: 'bruise',
        bg: 'drywall',
      },
    },
  },
};

export const theme = extendTheme(override);
