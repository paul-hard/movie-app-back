import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuggestedDBSchema, SuggestedMuvies } from './schema/muvie.schema/muvie.schema';
import { SuggestedMuviesService } from './suggested-muvies.service';
import { SuggestedMuviesController } from './suggested-muvies.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: SuggestedMuvies.name,
            schema: SuggestedDBSchema,
            collection: 'SuggestedMuvies'
        }])
    ],
    providers: [SuggestedMuviesService],
    controllers: [SuggestedMuviesController]
})
export class SuggestedMuvieAppModule { }
