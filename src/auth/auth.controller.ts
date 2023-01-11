import { Controller, UseGuards, Post, Req, Res, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { Get } from '@nestjs/common/decorators';
import { User } from '../user/user-schema/user.schema';
import { UserService } from 'src/user/user.service';
import { config } from 'dotenv'
config()

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) { }

  @Post('auth/signin')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req: any, @Res({ passthrough: true }) res: Response) {

    const jwtToken = await this.authService.login(req.user);

    const secretData = {
      accessToken: jwtToken,
      refreshToken: process.env.REFRESH_TOKEN,
    };

    res.cookie('auth-cookie', secretData, {
      httpOnly: true,
      expires: new Date(new Date().getTime() + 86409000),
    });

    return { msg: 'token returned successfuly' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user-profile')
  userProfile(@Req() req: Request) {
    return req.user
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('auth/:username')
  // getUser(@Param('username') username: string) {
  //   return this.userService.getUser(username)
  //   // return { msg: 'test', id: 'test_id007' }
  // }

  @UseGuards(AuthGuard('jwt'))
  @Get('suggested-movies')
  likedMovies() {
    // res.cookie('temp', "hello",{refresh-token
    //   httpOnly: true,
    //   expires: new Date(new Date().getTime()+86409000),
    // });
    return ["Avengers EndGame", "The Lion King", "Harry Potter", "Sherlock Holmes"];
  }

  //-------------------------------------------------------------------------------------------------------------

  @UseGuards(AuthGuard('jwt-refresh'))
  @Get('refresh-token')
  async refreshToken(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    //recive token 
    console.log("REFRESH TOKEN LOGIC");
    console.log(req.user);

    const jwtToken = await this.authService.login(req.user);

    const secretData = {
      accessToken: jwtToken,
      refreshToken: process.env.REFRESH_TOKEN,
    };
    console.log("before cookie");
    console.log(res.cookie);
    res.cookie('auth-cookie', secretData, {
      httpOnly: true,
      expires: new Date(new Date().getTime() + 86409000),
    });

    return { msg: 'success' };
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('auth-cookie');
    return { msg: 'success' };
  }
}
