import { Staff } from './staff';

export interface Audit {
  id: string;
  staffId: string;
  endpointMethod: string;
  params?: string;
  query?: string;
  payload?: string;
  createdBy: Staff;
  createdAt: Date;
}
