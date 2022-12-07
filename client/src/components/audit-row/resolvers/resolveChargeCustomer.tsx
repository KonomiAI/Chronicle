import { penniesToPrice } from '../../../utils';
import { IResolver } from '../type';

export const resolveChargeCustomer: IResolver = (_params, _query, payload) =>
  `${
    payload.amount > 0 ? 'Subtracted' : 'Top up'
  } the customer balance by ${penniesToPrice(
    -payload.amount,
  )}, with the description: ${payload.description || 'No description'}`; // or is used instead of ?? because empty string is not a valid description
