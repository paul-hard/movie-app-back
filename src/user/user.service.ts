import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './user-schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  //creation of the user and save it in DB
  async createUser(password: string, username: string): Promise<User> {
    return this.userModel.create({
      username,
      password,
    });
  }

  // user operations
  async getUser(username: string): Promise<User> {
    return this.userModel.findOne({ username: username });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}

//looking for data in Mongo, data structure represented via Schema
