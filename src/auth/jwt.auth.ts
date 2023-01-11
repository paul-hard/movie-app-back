import { Injectable } from '@nestjs/common/decorators';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { User } from '../user/user-schema/user.schema';
import { config } from 'dotenv';
config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    console.log('PASSPORT JWT START');
    super({
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const data = req?.cookies['auth-cookie'];

          if (!data) {
            return null;
          } else {
            return data.accessToken.access_token;
          }
        },
      ]),
    });
  }

  //
  async validate(payload: User) {
    console.log('VALIDATE JWT RETURN USER PAYLOAD');
    if (!payload) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}

// async login(user: User) {
//   const payload = { username: user.username, password: user.password };
//   return {
//       access_token: this.jwtService.sign(payload),
//   }
// }
