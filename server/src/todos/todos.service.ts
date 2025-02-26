import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.schema';

@Injectable()
export class TodosService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto, userId: string) {
    const createdTodo = new this.todoModel({
      ...createTodoDto,
      user: userId,
    });
    return createdTodo.save();
  }

  async findAll(userId: string) {
    return this.todoModel.find({ user: userId }).exec();
  }

  async update(id: string, updateTodoDto: CreateTodoDto) {
    return this.todoModel.findByIdAndUpdate(
      id,
      { $set: updateTodoDto },
      { new: true },
    );
  }

  async delete(id: string) {
    return this.todoModel.findByIdAndDelete(id);
  }
}
