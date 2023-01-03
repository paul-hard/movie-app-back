import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SuggestedMuvieAppModule } from './suggested-muvies/suggested-muvie-app.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    SuggestedMuvieAppModule,
    UserModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
