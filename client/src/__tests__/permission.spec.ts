import { describe } from 'vitest';
import { generatePermissionMap } from '../utils';

describe('generatePermissionMap', () => {
  test('will return correct permissions', () => {
    const roles = [
      {
        id: '123',
        name: 'test',
        staff: [],
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
        },
      },
    ];
    const results = generatePermissionMap(roles);
    expect(results).toEqual({
      Inventory: {
        read: true,
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
    });
  });
  test('will map multiple roles correctly', () => {
    const roles = [
      {
        id: '123',
        name: 'test',
        staff: [],
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
        },
      },
      {
        id: '1234',
        name: 'test2',
        staff: [],
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
            read: false,
            write: true,
          },
          Entry: {
            read: false,
            write: false,
          },
          Form: {
            read: false,
            write: false,
          },
        },
      },
    ];
    const results = generatePermissionMap(roles);
    expect(results).toEqual({
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
        read: false,
        write: false,
      },
      Form: {
        read: false,
        write: false,
      },
    });
  });
});
