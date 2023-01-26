import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SuggestedMuvieAppModule } from './suggested-muvies/suggested-muvie-app.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(), // to read .env config?
    MongooseModule.forRoot(process.env.MONGO_URI), // provide DB url
    SuggestedMuvieAppModule,
    UserModule,
  ],
  controllers: [], //app.controller
  providers: [],
})
export class AppModule {}
