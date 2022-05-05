import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.scss';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import theme from './theme';
import LoginPage from './pages/login';
import MainContainer from './pages/container';
import LandingPage from './pages/landing';
import AllowList from './pages/allowlist/Allowlist';
import StaffListPage from './pages/staff-list/StaffList';
import StaffDetailsPage from './pages/staff-details/StaffDetails';
import InventoryListPage from './pages/inventory/InventoryList';
import RolesListPage from './pages/roles-list/RolesList';
import {
  CreateRoleForm,
  UpdateRoleForm,
} from './pages/role-details/RoleDetails';
import NotFoundPage from './pages/not-found';
import Forms, { CreateForm, UpdateForm } from './pages/forms';

import { CustomerListPage } from './pages/customer-list';
import {
  CreateCustomerForm,
  ManageCustomerForm,
} from './pages/customer-details';
import ProductCreate from './pages/inventory/ProductCreate';
import ProductEdit from './pages/inventory/ProductEdit';
import ActivityCreate from './pages/inventory/ActivityCreate';
import ActivityEdit from './pages/inventory/ActivityEdit';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<MainContainer />}>
                <Route index element={<LandingPage />} />
                <Route path="staff" element={<StaffListPage />} />
                <Route path="staff/:id" element={<StaffDetailsPage />} />
                <Route path="inventory" element={<InventoryListPage />} />
                <Route
                  path="inventory/products/create"
                  element={<ProductCreate />}
                />
                <Route
                  path="inventory/products/:productId"
                  element={<ProductEdit />}
                />
                <Route
                  path="inventory/activities/create"
                  element={<ActivityCreate />}
                />
                <Route
                  path="inventory/activities/:activityId"
                  element={<ActivityEdit />}
                />
                <Route path="roles" element={<RolesListPage />} />
                <Route path="roles/new" element={<CreateRoleForm />} />
                <Route path="roles/:id" element={<UpdateRoleForm />} />
                <Route path="allowlist" element={<AllowList />} />
                <Route path="forms" element={<Forms />} />
                <Route path="forms/:formId" element={<UpdateForm />} />
                <Route path="forms/create" element={<CreateForm />} />
                <Route path="customers" element={<CustomerListPage />} />
                <Route path="customers/new" element={<CreateCustomerForm />} />
                <Route path="customers/:id" element={<ManageCustomerForm />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
