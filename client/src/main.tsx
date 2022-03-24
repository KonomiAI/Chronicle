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
import AllowList from './pages/allowlist';
import StaffListPage from './pages/staff-list/StaffList';
import StaffDetailsPage from './pages/staff-details/StaffDetails';
import InventoryListPage from './pages/inventory/InventoryList';
import InventoryCreatePage from './pages/inventory/InventoryCreate';
import InventoryEditPage from './pages/inventory/InventoryEdit';
import RolesListPage from './pages/roles-list/RolesList';
import RoleDetails from './pages/role-details/RoleDetails';
import NotFoundPage from './pages/not-found';

import ProtectedRoute from './components/protected-route';
import PrivilegedRoute from './components/privileged-route';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute user />}>
              <Route path="/" element={<MainContainer />}>
                <Route index element={<LandingPage />} />
                <Route path="staff" element={<StaffListPage />} />
                <Route path="staff/:id" element={<StaffDetailsPage />} />
                <Route path="inventory" element={<InventoryListPage />} />
                <Route
                  path="inventory/create"
                  element={<InventoryCreatePage />}
                />
                <Route path="inventory/:id" element={<InventoryEditPage />} />
                <Route path="roles" element={<RolesListPage />} />
                <Route path="roles/:id" element={<RoleDetails />} />
                <Route
                  path="allowlist"
                  element={
                    <PrivilegedRoute isAllowed={false}>
                      <AllowList />
                    </PrivilegedRoute>
                  }
                />
              </Route>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
