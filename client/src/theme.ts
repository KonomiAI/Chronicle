import { createTheme } from '@mui/material';
import { Shadows } from '@mui/material/styles/shadows';

const theme = createTheme({
  shadows: [
    'none',
    '0 0.125em 0.313em rgba(50,50,93,.09), 0 0.063em 0.125em rgba(0,0,0,.07)',
    '0 0.250em 0.375em rgba(50,50,93,.09), 0 0.063em 0.188em rgba(0,0,0,.08)',
    '0 0.063em 0.313em 0 rgba(0,0,0,.07), 0 0.438em 1.063em 0 rgba(0,0,0,.1)',
    '0 0.938em 2.188em rgba(50,50,93,.1), 0 0.313em 0.938em rgba(0,0,0,.07)',
    '0 0.938em 2.188em rgba(50,50,93,.15), 0 0.313em 0.938em rgba(0,0,0,.1)',
    ...Array(19).fill('none'),
  ] as Shadows,
  palette: {
    primary: {
      main: '#FF6961',
      dark: '#E20B00',
      light: '#FF8780',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#010409',
      secondary: '#777',
    },
    background: {
      default: '#f6f6f7',
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '2.5em',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2em',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.75em',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.5em',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1.25em',
      fontWeight: 700,
    },
  },
});

/**
 * This one adds component customizations while allowing
 * us to use properties in the main theme.
 */
const finalTheme = createTheme(theme, {
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: theme.shadows[3],
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      },
    },
  },
});

export default finalTheme;
