import { PermissionDetail, StaffIdLessRole } from '../types';

export const DEFAULT_PERMISSIONS: Record<string, PermissionDetail> = {
  Inventory: {
    read: false,
    write: false,
  },
  Security: {
    read: false,
    write: false,
  },
  Customer: {
    read: false,
    write: false,
  },
  Entry: {
    read: false,
    write: false,
  },
  Form: {
    read: false,
    write: false,
  },
};

const DEFAULT_KEYS = new Set(Object.keys(DEFAULT_PERMISSIONS));

/**
 * Go through the staff's role list and make sure each permission is set
 * correctly. If staff has write permission make sure to also grant them read.
 *
 * @param roles The staff's roles to check
 * @returns a map of permissions
 */
export const generatePermissionMap = (roles: StaffIdLessRole[]) => {
  const results = DEFAULT_PERMISSIONS;

  roles.forEach((role: StaffIdLessRole) => {
    const currentPermissions = role.permissions;
    Object.keys(currentPermissions).forEach((key) => {
      if (DEFAULT_KEYS.has(key)) {
        if (currentPermissions[key].read) {
          results[key].read = true;
        }
        if (currentPermissions[key].write) {
          // If user can write they should also be able to read.
          results[key].read = true;
          results[key].write = true;
        }
      }
    });
  });

  return results;
};
