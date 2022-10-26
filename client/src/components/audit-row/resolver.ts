import { Audit } from '../../types';

type Data = { [key: string]: never };

interface IResolver {
  (params: Data, query: Data, payload: Data): string;
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

const resolveUpdateVariant: IResolver = (params: Data) =>
  `Updated variant with ID of ${params.variantId} on product with ID of ${params.productId}`;

const resolveDeleteProduct: IResolver = (params: Data) =>
  `Deleted product with ID of ${params.id}.`;

const resolveUpdateActivity: IResolver = (params: Data) =>
  `Updated activity with ID of ${params.id}.`;

const resolveCreateActivity: IResolver = (
  _params: Data,
  _query: Data,
  payload: Data,
) => `Created new activity "${payload.name}"`;

const resolveCreateActivityEntry: IResolver = (
  _params: Data,
  _query: Data,
  payload: Data,
) =>
  `Created new activity entry for customer with ID of ${payload.customerId}.`;

const resolveUpdateActivityEntry: IResolver = (params: Data) =>
  `Updated Activity Entry with ID of ${params.id}.`;

const resolveChargeActivityEntry: IResolver = (params: Data) =>
  `Charged Activity Entry with ID of ${params.id}.`;

const resolveCreateCustomer: IResolver = (
  _params: Data,
  _query: Data,
  payload: Data,
) => `Created a new customer with email: ${payload.email}`;

const resolveUpdateCustomer: IResolver = (params: Data) =>
  `Updated customer with ID of ${params.id}.`;

const resolve: IResolver = (params: Data, query: Data, payload: Data) => {
  console.log(params, query, payload);
  return `Updated activity with ID of ${params.id}.`;
};

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

const generateMessage = (audit: Audit): string => {
  const { endpointMethod } = audit;

  if (!(endpointMethod in resolveAuditMessage)) {
    return `${endpointMethod} formatter not found.`;
  }

  let payload;
  let params;
  let query;

  try {
    if (audit.payload) payload = JSON.parse(audit.payload) || {};
    if (audit.params) params = JSON.parse(audit.params) || {};
    if (audit.query) query = JSON.parse(audit.query) || {};
  } catch (e) {
    return `${endpointMethod}: error parsing information`;
  }

  return resolveAuditMessage[endpointMethod](params, query, payload);
};

export default generateMessage;
