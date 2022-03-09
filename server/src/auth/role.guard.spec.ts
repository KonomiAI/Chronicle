import { Controller, Get } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { Actions, Features } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { Auth } from './role.decorator';
import { PermissionGuard } from './role.guard';

@Controller()
export class PermissionGuardTestComponent {
  @Get()
  @Auth(Actions.READ, [Features.Customer])
  getData() {
    return 'Hello!';
  }
}

describe('PermissionGuard', () => {
  let permissionGuard: PermissionGuard;
  let testComponent: PermissionGuardTestComponent;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionGuard,
        {
          provide: JwtStrategy,
          useValue: {
            validate: () => {
              return {
                roles: [
                  {
                    permissions: {
                      Entry: {
                        read: true,
                        write: false,
                      },
                    },
                  },
                ],
              };
            },
          },
        },
      ],
      controllers: [PermissionGuardTestComponent],
      imports: [AuthModule],
    }).compile();

    permissionGuard = app.get(PermissionGuard);
    testComponent = app.get(PermissionGuardTestComponent);
  });

  describe('root', () => {
    it('should return true if one permission is true', () => {
      const res = permissionGuard['checkIfUserHasAccess'](
        {
          roles: [
            {
              permissions: {
                Entry: {
                  read: true,
                  write: false,
                },
              },
            },
          ],
        },
        [Features.Entry],
        Actions.READ,
      );
      expect(res).toEqual(true);
    });
    it('should return false if no permissions is true', () => {
      const res = permissionGuard['checkIfUserHasAccess'](
        {
          roles: [
            {
              permissions: {
                Customer: {
                  read: true,
                  write: false,
                },
              },
            },
          ],
        },
        [Features.Entry],
        Actions.READ,
      );
      expect(res).toEqual(false);
    });
    it('should return true if one of the permissions is true', () => {
      const res = permissionGuard['checkIfUserHasAccess'](
        {
          roles: [
            {
              permissions: {
                Customer: {
                  read: true,
                  write: false,
                },
                Entry: {
                  read: false,
                  write: false,
                },
              },
            },
          ],
        },
        [Features.Entry, Features.Customer],
        Actions.READ,
      );
      expect(res).toEqual(true);
    });
  });
});
