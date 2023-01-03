import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt'

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string): Promise<any> {

        const user = await this.userService.getUser({ username });
        if (!user) return null;
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!user) {
            throw new NotAcceptableException('Such user does not exist');
        }
        if (user && passwordValid) {
            return user;
        }
        return null
    }

    async login(user: any) {
        const payload = { username: user.username, password: user.password };
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
