import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';

import { config } from 'dotenv';
config();

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private userService: UserService) {
    super({
      //previously in jwt-strategy was false;
      ignoreExpiration: true,
      passReqToCallback: true,
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const data = req?.cookies['auth-cookie'];
          console.log('ATTEMPT TO REFRESH');
          console.log({ 'REFRESH TOKEN DATA': data });
          if (!data) return null;
          return data.accessToken.access_token;
        },
      ]),
    });
  }

  async validate(req: Request, payload: any) {
    const data = req?.cookies['auth-cookie'];
    console.log({ 'TOKEN VALIDATE': data });
    console.log({ 'TOKEN VALIDATE PAYLOAD': payload });
    if (!data.refreshToken) {
      throw new UnauthorizedException();
    }
    if (!payload) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.getUser(payload.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    //save user data after page reload?
    return {
      username: user.username,
    };
  }
}
