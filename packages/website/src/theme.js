import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    secondary: {
      light: '#80e1fb',
      main: '#61DAFB',
      dark: '#4398af',
    },
    primary: {
      light: '##41444c',
      main: '#282c34',
      dark: '#20232a',
      contrastText: '#fff',
    },
    type: 'light',
  },
});

export default theme;
