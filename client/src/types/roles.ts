export interface PermissionDetail {
  read: boolean;
  write: boolean;
}

export interface Permissions {
  Inventory: PermissionDetail;
  Security: PermissionDetail;
  Customer: PermissionDetail;
  Entry: PermissionDetail;
  Form: PermissionDetail;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permissions;
  staffIds: string[];
}

export type StaffIdLessRole = Omit<Role, 'staffIds'>;
