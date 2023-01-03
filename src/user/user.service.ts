import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


import { User, UserDocument, } from './user-schema/user.schema';


@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async createUser(password: string, username: string): Promise<User> {
        return this.userModel.create({
            username,
            password,
        });
    }

    async getUser(query: object): Promise<User> {
        return this.userModel.findOne(query);
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }


}
