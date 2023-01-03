import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({ type: String, required: true, unique: true, })
    username: string;

    @Prop({ type: String, required: true, unique: true, })
    password: string;
}

export const userSchema = SchemaFactory.createForClass(User)