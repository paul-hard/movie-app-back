import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { User } from '../user/user-schema/user.schema'
@Injectable()
//main logic:
//this is subclass that extends passport strategy
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    //call PassportStrategy constructor via super
    //super required
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<User> {

    const user = await this.authService.validateUser(username, password);
    console.log('VALIDATE LOCAL');
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
