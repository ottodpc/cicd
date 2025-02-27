import { ExecutionContext } from '@nestjs/common'
import { createParamDecorator } from '@nestjs/common'
import { Context } from '../entities/context'
import { UserContext } from '../entities/usercontext'

export const ContextDecor = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		if (request['user']) {
			return request['user']
		}
		return new Context(new UserContext('anonymous'), false)
	}
)
