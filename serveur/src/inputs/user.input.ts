import { ApiProperty } from '@nestjs/swagger'
import { Todo } from '../models/todo'
import { ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateUserInput {
	@ApiProperty()
	username: string

	@ValidateNested({ each: true })
	@Type(() => Todo)
	@ApiProperty({ type: Todo, isArray: true })
	todos: Todo[]

	@ApiProperty()
	password: string[]
}
