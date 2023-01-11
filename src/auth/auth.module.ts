import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { LocalStrategy } from './local.auth';
import { JwtStrategy } from './jwt.auth';
import { RefreshTokenStrategy } from './refresh-token.auth'

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { User, userSchema } from 'src/user/user-schema/user.schema';
import { config } from 'dotenv';
config();

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '15s' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy, RefreshTokenStrategy],
})
export class AuthModule { }
