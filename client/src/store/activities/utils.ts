import axios from 'axios';

import { IActivity } from '../../common/interfaces/activities';
import ENV from '../../common/constants/environment';

const { backendUrl } = ENV;
/**
 * Returns all activities
 */
export const getAllActivities = async (): Promise<IActivity[]> => {
  const { data } = await axios.get<IActivity[]>(`${backendUrl}/activities`);
  return data;
};