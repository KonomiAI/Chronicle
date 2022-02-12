import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.scss';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import App from './App';
import theme from './theme';
import LoginPage from './pages/login';
import MainContainer from './pages/container';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<MainContainer />}>
            <Route index element={<App />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
