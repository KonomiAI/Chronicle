import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

const SELECT = {
	id: true,
	email: true,
	isSuperUser: true,
	isSuspended: true
}

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
		const user = await this.authService.getDetails({ id: payload.sub }, SELECT)
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
