import { Injectable } from '@nestjs/common';
import { CreateUserInput } from '../inputs/user.input';
import { Context } from '../entities/context';

import { UpdateUserInput } from '../inputs/user.update';
import { createUserFromInput } from '../mappers/user.mapper';
import { updateUserFromInput } from '../mappers/user.mapper';
import { UserNotFound } from '../exceptions/user.not.found';
import { UserRepository } from '../repositories/user.repository';
import { Logger } from '@nestjs/common';
@Injectable()
export class UserService {
  readonly logger: Logger = new Logger(this.constructor.name);

  async create(userId: string, createUserInput: CreateUserInput) {
    const user = createUserFromInput(userId, createUserInput);
    const createdUser = await this.userRepository.save(user);
    return createdUser;
  }

  async update(
    userId: string,
    updateUserInput: UpdateUserInput,
    context: Context,
  ) {
    const existingUserData = await this.userRepository.findById(userId);
    if (!existingUserData) {
      throw new UserNotFound('failed to getby Id userId}');
    }
    const updatedUser = updateUserFromInput(
      userId,
      updateUserInput,
      context,
      existingUserData,
    );
    const savedUser = this.userRepository.save(updatedUser);
    return savedUser;
  }

  async login(username: string, password: string) {
    return this.userRepository.login(username, password);
  }

  async get(userId: string) {
    const existingUser = await this.userRepository.findById(userId);
    if (!existingUser) {
      this.logger.error(`userId: ${userId} notFound`);
      throw new UserNotFound(`userId: ${userId} notFound`);
    }
    return existingUser;
  }

  async select(
    filters: string,
    sortFields: string,
    limit: number,
    offset: number,
  ) {
    const records = await this.userRepository.findAll(
      filters,
      sortFields,
      limit,
      offset,
    );
    return records;
  }

  async delete(userId: string) {
    await this.userRepository.deleteById(userId);
  }

  constructor(private userRepository: UserRepository) {}
}
