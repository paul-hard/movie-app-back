import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'

export type SuggestedMuviesDocument = SuggestedMuvies & Document;

@Schema({ collection: 'SuggestedDB' })
export class SuggestedMuvies {
    @Prop()
    id: number;
    @Prop()
    title: string;

    @Prop()
    name: string;

    @Prop()
    poster_path: string;

    @Prop()
    media_type: string;

    @Prop()
    vote_average: string;

}

export const SuggestedDBSchema = SchemaFactory.createForClass(SuggestedMuvies)

