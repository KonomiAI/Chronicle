import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.scss';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SnackbarProvider } from 'notistack';

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

import ProtectedRoute from './components/protected-route';
import PrivilegedRoute from './components/privileged-route';
import { Features } from './types';
import { ActivityEntryList } from './pages/activity-entry-list';
import { ActivityEntryDetails } from './pages/activity-entry-details/ActivityEntryDetails';
import BasicAnalyticsPage from './pages/analytics/BasicAnalyticsPage';
import ProfilePage from './pages/profile/Profile';
import AlertProvider from './components/use-alert/UseAlertContext';
import AuditPage from './pages/audit/AuditPage';
import Logout from './pages/logout/Logout';

const RouteMap = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<Logout />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainContainer />}>
          <Route index element={<LandingPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route element={<PrivilegedRoute feature={Features.SECURITY} />}>
            <Route path="staff" element={<StaffListPage />} />
            <Route path="staff/:id" element={<StaffDetailsPage />} />
            <Route path="roles" element={<RolesListPage />} />
            <Route path="roles/new" element={<CreateRoleForm />} />
            <Route path="roles/:id" element={<UpdateRoleForm />} />
            <Route path="allowlist" element={<AllowList />} />
            <Route path="audit" element={<AuditPage />} />
          </Route>
          <Route element={<PrivilegedRoute feature={Features.INVENTORY} />}>
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
          </Route>
          <Route element={<PrivilegedRoute feature={Features.FORM} />}>
            <Route path="forms" element={<Forms />} />
            <Route path="forms/:formId" element={<UpdateForm />} />
            <Route path="forms/create" element={<CreateForm />} />
          </Route>
          <Route element={<PrivilegedRoute feature={Features.CUSTOMER} />}>
            <Route path="customers" element={<CustomerListPage />} />
            <Route path="customers/new" element={<CreateCustomerForm />} />
            <Route path="customers/:id" element={<ManageCustomerForm />} />
          </Route>
          <Route element={<PrivilegedRoute feature={Features.ENTRY} />}>
            <Route path="activity-entries" element={<ActivityEntryList />} />
            <Route
              path="activity-entries/:id"
              element={<ActivityEntryDetails />}
            />
          </Route>
          <Route element={<PrivilegedRoute feature={Features.ENTRY} />}>
            <Route path="analytics" element={<BasicAnalyticsPage />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

const ApplicationWrapper = () => {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: (failureCount, error) => {
              try {
                const errorData = JSON.parse(JSON.stringify(error));
                // If error is 401 there is no point in retrying, just log out
                if (errorData?.status === 401) {
                  window.location.assign('/logout');
                  return false;
                }
                return failureCount < 3;
              } catch (e) {
                return failureCount < 3;
              }
            },
          },
        },
      }),
    [],
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <SnackbarProvider>
            <AlertProvider>
              <CssBaseline />
              <RouteMap />
            </AlertProvider>
          </SnackbarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ApplicationWrapper />
  </React.StrictMode>,
  document.getElementById('root'),
);
