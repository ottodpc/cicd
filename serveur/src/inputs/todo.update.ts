import { ApiProperty } from '@nestjs/swagger'

export class UpdateTodoInput {
	@ApiProperty()
	title: string

	@ApiProperty()
	description: string
}
