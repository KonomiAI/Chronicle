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
  permissions: Record<string,PermissionDetail>;
  staffIds: string[];
}

export type StaffIdLessRole = Omit<Role, 'staffIds'>;
