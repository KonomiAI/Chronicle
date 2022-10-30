export const COMMON_ROLE_FIXTURES = [
  {
    name: 'Admin',
    permissions: {
      Inventory: {
        read: true,
        write: true,
      },
      Security: {
        read: true,
        write: true,
      },
      Customer: {
        read: true,
        write: true,
      },
      Entry: {
        read: true,
        write: true,
      },
      Form: {
        read: true,
        write: true,
      },
    },
  },
  {
    name: 'Receptionist',
    permissions: {
      Inventory: {
        read: true,
        write: false,
      },
      Security: {
        read: false,
        write: false,
      },
      Customer: {
        read: true,
        write: true,
      },
      Entry: {
        read: true,
        write: false,
      },
      Form: {
        read: true,
        write: false,
      },
    },
  },
  {
    name: 'Read Only',
    permissions: {
      Inventory: {
        read: true,
        write: false,
      },
      Security: {
        read: false,
        write: false,
      },
      Customer: {
        read: true,
        write: false,
      },
      Entry: {
        read: true,
        write: false,
      },
      Form: {
        read: true,
        write: false,
      },
    },
  },
  {
    name: 'Practitioner',
    permissions: {
      Inventory: {
        read: true,
        write: false,
      },
      Security: {
        read: false,
        write: false,
      },
      Customer: {
        read: true,
        write: false,
      },
      Entry: {
        read: true,
        write: true,
      },
      Form: {
        read: true,
        write: false,
      },
    },
  },
];
