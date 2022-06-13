export enum Features {
  INVENTORY = 'Inventory',
  SECURITY = 'Security',
  CUSTOMER = 'Customer',
  ENTRY = 'Entry',
  FORM = 'Form',
}

export interface PermissionDetail {
  read: boolean;
  write: boolean;
}

export type Permissions = {
  [key in Features]: PermissionDetail;
};

export interface Role {
  id: string;
  name: string;
  permissions: Record<string, PermissionDetail>;
  staffIds: string[];
}

export type StaffIdLessRole = Omit<Role, 'staffIds'>;

export type RoleData = Omit<Role, 'id'>;
