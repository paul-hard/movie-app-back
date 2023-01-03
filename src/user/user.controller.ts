import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user-schema/user.schema';

import * as bcrypt from 'bcrypt';


@Controller('auth')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('/signup')
    async createUser(
        @Body('username') username: string,
        @Body('password') password: string,
    ): Promise<User> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const result = await this.userService.createUser(
            hashedPassword,
            username
        );
        return result
    }
}
