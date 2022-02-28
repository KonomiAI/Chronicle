import axios from 'axios';

import { IActivity, IActivityParams } from '../../common/interfaces/activities';
import ENV from '../../common/constants/environment';

const { backendUrl } = ENV;

/**
 * Returns all activities
 */
export const getAllActivities = async (): Promise<IActivity[]> => {
  const { data } = await axios.get(`${backendUrl}/activities`);
  return data;
};

/**
 * Creates a new activity
 */
export const createActivity = async ({name, price}: IActivityParams) => {
  const params: IActivity = {
    name,
    price: price.toString(),
  }

  const { data } = await axios.post(
    `${backendUrl}/activities`,
    params,
  )
  return data;
};