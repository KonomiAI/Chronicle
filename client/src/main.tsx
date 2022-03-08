import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.scss';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';

import theme from './theme';
import LoginPage from './pages/login';
import MainContainer from './pages/container';
import LandingPage from './pages/landing';
import StaffListPage from './pages/staff-list/StaffList';
import StaffDetailsPage from './pages/staff-details/StaffDetails';
import RolesListPage from './pages/roles-list/RolesList'
import RoleDetails from './pages/role-details/RoleDetails'

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<MainContainer />}>
              <Route index element={<LandingPage />} />
              <Route path="staff" element={<StaffListPage />} />
              <Route path="staff/:id" element={<StaffDetailsPage />} />
              <Route path="roles" element={<RolesListPage />} />
              <Route path="roles/:id" element={<RoleDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
