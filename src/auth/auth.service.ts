import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/user/user-schema/user.schema';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(
        username: string,
        password: string,
    ): Promise<User> {

        //validate: compare provided username and Mongo stored username
        //take it from db via userService
        const user = await this.userService.getUser(username); // removed {} 
        //if user does not exist, not signed up or wrong credentials, return null
        if (!user) return null;

        //validate: compare pass via bcrypt library
        const passwordValid = await bcrypt.compare(password, user.password);
        // if (!user) {
        //     throw new NotAcceptableException('Such user does not exist');
        // }
        //if valid return user, else null
        if (user && passwordValid) {
            return user;
        }
        return null
    }

    //implement JWT, create token 
    async login(user: User) {
        const payload = { username: user.username, password: user.password };

        return {
            access_token: this.jwtService.sign(payload),
        }
        // return this.jwtService.sign(user)
    }
}
