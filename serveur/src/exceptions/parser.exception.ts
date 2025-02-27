import { HttpStatus } from '@nestjs/common'

import { TodoappCustomException } from './todoapp.custom.exception'

export class ParserException extends TodoappCustomException {
	constructor(message: string) {
		super(message, HttpStatus.BAD_REQUEST)
	}
}
