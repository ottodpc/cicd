import { Injectable } from '@nestjs/common';
import { CreateTodoInput } from '../inputs/todo.input';
import { Context } from '../entities/context';

import { UpdateTodoInput } from '../inputs/todo.update';
import { createTodoFromInput } from '../mappers/todo.mapper';
import { updateTodoFromInput } from '../mappers/todo.mapper';
import { TodoNotFound } from '../exceptions/todo.not.found';
import { TodoRepository } from '../repositories/todo.repository';
import { Logger } from '@nestjs/common';
@Injectable()
export class TodoService {
  readonly logger: Logger = new Logger(this.constructor.name);

  async create(todoId: string, createTodoInput: CreateTodoInput) {
    const todo = createTodoFromInput(todoId, createTodoInput);
    const createdTodo = await this.todoRepository.save(todo);
    return createdTodo;
  }

  async update(
    todoId: string,
    updateTodoInput: UpdateTodoInput,
    context: Context,
  ) {
    const existingTodoData = await this.todoRepository.findById(todoId);
    if (!existingTodoData) {
      throw new TodoNotFound('failed to getby Id todoId}');
    }
    const updatedTodo = updateTodoFromInput(
      todoId,
      updateTodoInput,
      context,
      existingTodoData,
    );
    const savedTodo = this.todoRepository.save(updatedTodo);
    return savedTodo;
  }

  async get(todoId: string) {
    const existingTodo = await this.todoRepository.findById(todoId);
    if (!existingTodo) {
      this.logger.error(`todoId: ${todoId} notFound`);
      throw new TodoNotFound(`todoId: ${todoId} notFound`);
    }
    return existingTodo;
  }

  async select(
    filters: string,
    sortFields: string,
    limit: number,
    offset: number,
  ) {
    const records = await this.todoRepository.findAll(
      filters,
      sortFields,
      limit,
      offset,
    );
    return records;
  }

  async delete(todoId: string) {
    await this.todoRepository.deleteById(todoId);
  }

  constructor(private todoRepository: TodoRepository) {}
}
