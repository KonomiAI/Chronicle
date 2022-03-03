import axios from 'axios';

import { IActivity } from '../interfaces/activities';
import ENV from '../constants/environment';

const { backendUrl } = ENV;
/**
 * Returns all activities
 */
export const getAllActivities = async (): Promise<IActivity[]> => {
  const { data } = await axios.get<IActivity[]>(`${backendUrl}/activities`);
  return data;
};