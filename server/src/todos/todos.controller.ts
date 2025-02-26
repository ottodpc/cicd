import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @CurrentUser() user) {
    return this.todosService.create(createTodoDto, user._id);
  }

  @Get()
  findAll(@CurrentUser() user) {
    return this.todosService.findAll(user._id);
  }

  @Put(':id')
  update(@Body() createTodoDto: CreateTodoDto, @Param('id') id: string) {
    return this.todosService.update(id, createTodoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todosService.delete(id);
  }
}
