import React from 'react';
import { Link } from 'react-router-dom';

import { Audit } from '../../types';
import { resolveAddIPToAllowList } from './resolvers/resolveAddIPToAllowList';
import { resolveCreateForm } from './resolvers/resolveCreateForm';
import { resolveCreateRole } from './resolvers/resolveCreateRole';
import { resolveUpdateForm } from './resolvers/resolveUpdateForm';
import { AuditData, IResolver } from './type';

// TODO: migrate all audit resolvers to their own file

const resolveDeleteIPfromAllowList: IResolver = () =>
  `Deleted IP from the AllowList.`;

const resolveCreateNewStaff: IResolver = (
  _params: AuditData,
  _query: AuditData,
  payload: AuditData,
) => `Added new staff with email: ${payload.email}.`;

const resolveUpdateVariant: IResolver = (params: AuditData) => (
  <>
    Updated a variant on the following{' '}
    <Link to={`/inventory/products/${params.productId}`}>product</Link>
  </>
);

const resolveDeleteProduct: IResolver = () => `Deleted a product`;

const resolveUpdateActivity: IResolver = (params: AuditData) => (
  <>
    Updated the following{' '}
    <Link to={`/inventory/activities/${params.id}`}>activity</Link>
  </>
);

const resolveCreateActivity: IResolver = (
  _params: AuditData,
  _query: AuditData,
  payload: AuditData,
) => `Created a new activity: "${payload.name}"`;

const resolveCreateActivityEntry: IResolver = (
  _params: AuditData,
  _query: AuditData,
  payload: AuditData,
) => (
  <>
    Created a new activity entry for this{' '}
    <Link to={`/customers/${payload.customerId}`}>customer</Link>
  </>
);

const resolveUpdateActivityEntry: IResolver = (params: AuditData) => (
  <>
    Updated the following{' '}
    <Link to={`/activity-entries/${params.id}`}>activity entry</Link>
  </>
);

const resolveChargeActivityEntry: IResolver = (params: AuditData) => (
  <>
    Charged the following{' '}
    <Link to={`/activity-entries/${params.id}`}>activity entry</Link>
  </>
);

const resolveCreateCustomer: IResolver = (
  _params: AuditData,
  _query: AuditData,
  payload: AuditData,
) => `Created a new customer with email: ${payload.email}`;

const resolveUpdateCustomer: IResolver = (params: AuditData) => (
  <>
    Updated the following <Link to={`/customer/${params.id}`}>customer</Link>
  </>
);

const resolveAuditMessage: Record<string, IResolver> = {
  addIPToAllowList: resolveAddIPToAllowList,
  deleteIPfromAllowList: resolveDeleteIPfromAllowList,
  createNewStaff: resolveCreateNewStaff,
  updateVariant: resolveUpdateVariant,
  deleteProduct: resolveDeleteProduct,
  updateActivity: resolveUpdateActivity,
  createActivity: resolveCreateActivity,
  createActivityEntry: resolveCreateActivityEntry,
  updateActivityEntry: resolveUpdateActivityEntry,
  chargeActivityEntry: resolveChargeActivityEntry,
  createCustomer: resolveCreateCustomer,
  updateCustomer: resolveUpdateCustomer,
  createForm: resolveCreateForm,
  updateForm: resolveUpdateForm,
  createRole: resolveCreateRole,
};

const generateMessage = (audit: Audit): React.ReactNode => {
  const { endpointMethod } = audit;

  if (!(endpointMethod in resolveAuditMessage)) {
    return `${endpointMethod} formatter not found.`;
  }

  let payload;
  let params;
  let query;

  try {
    if (audit.payload) payload = JSON.parse(audit.payload) ?? {};
    if (audit.params) params = JSON.parse(audit.params) ?? {};
    if (audit.query) query = JSON.parse(audit.query) ?? {};
  } catch (e) {
    return `${endpointMethod}: error parsing information`;
  }

  return resolveAuditMessage[endpointMethod](params, query, payload);
};

export default generateMessage;
