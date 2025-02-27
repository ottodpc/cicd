import { Controller } from '@nestjs/common'
import { DefaultValuePipe } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Get } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { UseGuards } from '@nestjs/common'
import { Param } from '@nestjs/common'
import { ContextDecor } from '../configurations/context.decorator'
import { Context } from '../entities/context'

import { PageInfo } from '../entities/pageinfo'
import { PagedResponse } from '../entities/pagedresponse'
import { ApiQuery } from '@nestjs/swagger'
import { Query } from '@nestjs/common'
import { TodoService } from '../services/todo.service'
import { Logger } from '@nestjs/common'
@Controller('/v1/')
export class TodoQueryController {
	readonly logger: Logger = new Logger(this.constructor.name)

	@Get('todos/:todoId')
	@ApiBearerAuth('access-token')
	@UseGuards(AuthGuard('jwt'))
	async get(
		@Param('todoId') todoId: string,
		@ContextDecor() context: Context
	) {
		this.logger.log(`Received a get request for Todo: ${todoId}`)
		const existingTodo = await this.todoService.get(todoId, context)
		this.logger.log(`Get request for Todo ${todoId} is complete `)
		return existingTodo
	}

	@Get('todos')
	@ApiBearerAuth('access-token')
	@UseGuards(AuthGuard('jwt'))
	@ApiQuery({ name: 'filters', required: false })
	@ApiQuery({ name: 'sortFields', required: false })
	@ApiQuery({ name: 'limit', required: false })
	@ApiQuery({ name: 'offset', required: false })
	async select(
		@Query('filters', new DefaultValuePipe('')) filters: string,
		@Query('sortFields', new DefaultValuePipe('')) sortFields: string,
		@Query('limit', new DefaultValuePipe(10)) limit: number,
		@Query('offset', new DefaultValuePipe(0)) offset: number,
		@ContextDecor() context: Context
	) {
		this.logger.log(
			`Received a selectAll request for Todo with filters: ${filters} sort: ${sortFields} limit: ${limit} offset: ${offset}`
		)
		const response = await this.todoService.select(
			filters,
			sortFields,
			limit,
			offset,
			context
		)
		this.logger.log(
			`SelectAll request for Todo with filters: ${filters} sort: ${sortFields} limit: ${limit} offset: ${offset} is complete `
		)
		const pageInfo = new PageInfo(limit, offset)
		return new PagedResponse(response, pageInfo)
	}

	constructor(private todoService: TodoService) {}
}
