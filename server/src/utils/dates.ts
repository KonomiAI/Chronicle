import { format } from 'date-fns';

export const getTodayDateString = () => format(new Date(), 'yyyy-MM-dd');
