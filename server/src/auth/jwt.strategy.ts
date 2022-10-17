import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

const SELECT = {
  id: true,
  email: true,
  isSuperUser: true,
  isSuspended: true,
  roles: {
    select: {
      id: true,
      name: true,
      permissions: true,
    },
  },
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  async validate(payload: any) {
    const user = await this.authService.getDetails({ id: payload.sub }, SELECT);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
