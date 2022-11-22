import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuggestedMuvieAppModule } from './suggested-muvies/suggested-muvie-app.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://pavlo_admin:lAqMQxiJK6KrVJym@muvie-app.zwfbxxy.mongodb.net/SuggestedDB_SuggestedMuvies?retryWrites=true&w=majority'),
    SuggestedMuvieAppModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
