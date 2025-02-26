import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, ObjectId } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(user: Partial<User>): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findByUsername(
    username: string,
  ): Promise<
    Document<unknown, any, User> & User & { _id: ObjectId } & { __v: number }
  > {
    return this.userModel.findOne({ username }).exec() as unknown as Document<
      unknown,
      any,
      User
    > &
      User & { _id: ObjectId } & { __v: number };
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }
}
