import { createTheme } from '@mui/material';

const theme = createTheme({
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
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: `1px solid rgba(0, 0, 0, 0.12)`,
        },
      },
    },
  },
});

export default theme;
