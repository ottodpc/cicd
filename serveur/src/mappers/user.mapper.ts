import { UpdateUserInput } from '../inputs/user.update';
import { Context } from '../entities/context';
import { User } from '../models/user';

import { CreateUserInput } from '../inputs/user.input';

export const updateUserFromInput = (
  id: string,
  input: UpdateUserInput,
  context: Context,
  existingModel: User,
) => {
  existingModel.username = input.username;
  existingModel.todos = input.todos;
  existingModel.password = input.password;
  existingModel.userId = id;
  return existingModel;
};

export const createUserFromInput = (id: string, input: CreateUserInput) => {
  const model = new User();
  model.username = input.username;
  model.todos = input.todos;
  model.password = input.password;
  model.userId = id;
  return model;
};
