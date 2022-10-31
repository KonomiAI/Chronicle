import React from 'react';
import { Link } from 'react-router-dom';

import { Audit, ßwillFixThisTypeLater } from '../../types';

type Data = { [key: string]: ßwillFixThisTypeLater };

interface IResolver {
  (params: Data, query: Data, payload: Data): React.ReactNode;
}

const resolveAddIPToAllowList: IResolver = (
  _params: Data,
  _query: Data,
  payload: Data,
) => `Added IP ${payload.ip} to the AllowList`;

const resolveDeleteIPfromAllowList: IResolver = () =>
  `Deleted IP from the AllowList.`;

const resolveCreateNewStaff: IResolver = (
  _params: Data,
  _query: Data,
  payload: Data,
) => `Added new staff with email: ${payload.email}.`;

const resolveUpdateVariant: IResolver = (params: Data) => (
  <>
    Updated a variant on the following{' '}
    <Link to={`/inventory/products/${params.productId}`}>product</Link>
  </>
);

const resolveDeleteProduct: IResolver = () => `Deleted a product`;

const resolveUpdateActivity: IResolver = (params: Data) => (
  <>
    Updated the following{' '}
    <Link to={`/inventory/activities/${params.id}`}>activity</Link>
  </>
);

const resolveCreateActivity: IResolver = (
  _params: Data,
  _query: Data,
  payload: Data,
) => `Created a new activity: "${payload.name}"`;

const resolveCreateActivityEntry: IResolver = (
  _params: Data,
  _query: Data,
  payload: Data,
) => (
  <>
    Created a new activity entry for the following{' '}
    <Link to={`/customers/${payload.customerId}`}>customer</Link>
  </>
);

const resolveUpdateActivityEntry: IResolver = (params: Data) => (
  <>
    Updated the following{' '}
    <Link to={`/activity-entries/${params.id}`}>activity entry</Link>
  </>
);

const resolveChargeActivityEntry: IResolver = (params: Data) => (
  <>
    Charged the following{' '}
    <Link to={`/activity-entries/${params.id}`}>activity entry</Link>
  </>
);

const resolveCreateCustomer: IResolver = (
  _params: Data,
  _query: Data,
  payload: Data,
) => `Created a new customer with email: ${payload.email}`;

const resolveUpdateCustomer: IResolver = (params: Data) => (
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
