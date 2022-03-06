import { BadRequestException, Injectable } from '@nestjs/common';
import { StaffService } from 'src/models/staff/staff.service';
import { BcryptService } from './bcrypt.service';
import { JwtService } from '@nestjs/jwt';

//TODO: return roles associated as well when that relation has been established
const SELECT = {
	id: true,
	firstName: true,
	lastName: true,
	email: true,
	authKey: true,
	gender: true,
	isSuperUser: true,
}

@Injectable()
export class AuthService {
	constructor(
		private staffService: StaffService,
		private jwtService: JwtService,
		private bcrypt: BcryptService
	) { }
	async validateUser(email: string, password: string) {
		const user = await this.getDetails({ email }, SELECT)
		const valid = await this.verifyPassword(password, user.authKey)
		if (user?.authKey && valid) {
			const { authKey, ...result } = user;
			return result;
		}
		throw new BadRequestException(
			'User with the username and password is not found',
		);
	}
	private verifyPassword(pass: string, hash: string) {
		return this.bcrypt.verify(pass, hash);
	}
	async obtainToken(user: any) {
		const payload = { email: user.email, sub: user.id };
		return {
			accessToken: this.jwtService.sign(payload),
			...user,
		};
	}

	getDetails(payload, select) {
		return this.staffService.findOne(payload, select)
	}
}
