import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from './user.repository';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private userRepository: UserRepository,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    return this.userRepository.create(user);
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findByUsername(username);
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }
}
