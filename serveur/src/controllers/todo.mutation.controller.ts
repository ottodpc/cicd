import { Controller } from '@nestjs/common'
import { Response } from 'express'
import { v4 } from 'uuid'
import { AuthGuard } from '@nestjs/passport'
import { Post } from '@nestjs/common'
import { HttpCode } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { UseGuards } from '@nestjs/common'
import { Body } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common'
import { CreateTodoInput } from '../inputs/todo.input'
import { ContextDecor } from '../configurations/context.decorator'
import { Context } from '../entities/context'
import { Res } from '@nestjs/common'

import { Put } from '@nestjs/common'
import { Param } from '@nestjs/common'
import { UpdateTodoInput } from '../inputs/todo.update'
import { Delete } from '@nestjs/common'
import { TodoService } from '../services/todo.service'
import { Logger } from '@nestjs/common'
@Controller('/v1/')
export class TodoController {
	readonly logger: Logger = new Logger(this.constructor.name)

	@Post('todos')
	@HttpCode(200)
	@ApiBearerAuth('access-token')
	@UseGuards(AuthGuard('jwt'))
	async create(
		@Body(new ValidationPipe()) createTodoInput: CreateTodoInput,
		@ContextDecor() context: Context,
		@Res() response: Response
	) {
		this.logger.log(`Received a new create request `)
		const todoId = v4()
		const created = await this.todoService.create(
			todoId,
			createTodoInput,
			context
		)
		response.setHeader('Location', '/v1/todos/' + todoId)
		response.json(created)
		this.logger.log(`Create request for Todo ${todoId} is complete`)
		return response
	}

	@Put('todos/:todoId')
	@ApiBearerAuth('access-token')
	@UseGuards(AuthGuard('jwt'))
	async update(
		@Param('todoId') todoId: string,
		@Body(new ValidationPipe()) updateTodoInput: UpdateTodoInput,
		@ContextDecor() context: Context,
		@Res() response: Response
	) {
		this.logger.log(`Received a update request for : ${todoId}`)
		const updtedTodo = await this.todoService.update(
			todoId,
			updateTodoInput,
			context
		)
		response.setHeader('Location', '/v1/todos/' + todoId)
		response.json(updtedTodo)
		this.logger.log(`Update request for  is complete: ${todoId}`)
		return response
	}

	@Delete('todos/:todoId')
	@ApiBearerAuth('access-token')
	@UseGuards(AuthGuard('jwt'))
	async delete(
		@Param('todoId') todoId: string,
		@ContextDecor() context: Context
	) {
		this.logger.log(`Received a delete request for : ${todoId} `)
		await this.todoService.delete(todoId, context)
		this.logger.log(`Delete request completed for  ${todoId} is complete `)
	}

	constructor(private todoService: TodoService) {}
}
