import { TodoRepository } from '../../repositories/todo.repository'
import { TodoService } from '../todo.service'
import { Todo } from '../../models/todo'
import { readResourceFromExactPath } from '../../../test/utils'
import { CreateTodoInput } from '../../inputs/todo.input'
import { UserContext } from '../../entities/usercontext'
import { Context } from '../../entities/context'
import { UpdateTodoInput } from '../../inputs/todo.update'
describe('should test todoService', () => {
	let todoService: TodoService
	let todoRepository: TodoRepository

	beforeEach(async () => {
		todoRepository = {
			save: jest.fn(),
			findById: jest.fn(),
			findAll: jest.fn(),
			deleteById: jest.fn(),
		} as unknown as TodoRepository
		todoService = new TodoService(todoRepository)
	})

	it('should test create method', async () => {
		jest.spyOn(todoRepository, 'save').mockReturnValue(
			Promise.resolve(
				await JSON.parse(
					readResourceFromExactPath(
						__dirname + '/resources/Todo.json'
					)
				)
			)
		)
		const actualResp = await todoService.create(
			'defaultString',
			await JSON.parse(
				readResourceFromExactPath(
					__dirname + '/resources/createTodoInput.json'
				)
			),
			new Context(new UserContext('defaultString'), false)
		)
		expect(jest.spyOn(todoRepository, 'save')).toBeCalledTimes(1)
		expect(actualResp).toMatchSnapshot()
	})

	it('should test update method', async () => {
		jest.spyOn(todoRepository, 'save').mockReturnValue(
			Promise.resolve(
				await JSON.parse(
					readResourceFromExactPath(
						__dirname + '/resources/Todo.json'
					)
				)
			)
		)
		jest.spyOn(todoRepository, 'findById').mockReturnValue(
			Promise.resolve(
				await JSON.parse(
					readResourceFromExactPath(
						__dirname + '/resources/Todo.json'
					)
				)
			)
		)
		const actualResp = await todoService.update(
			'defaultString',
			await JSON.parse(
				readResourceFromExactPath(
					__dirname + '/resources/updateTodoInput.json'
				)
			),
			new Context(new UserContext('defaultString'), false)
		)
		expect(jest.spyOn(todoRepository, 'save')).toBeCalledTimes(1)
		expect(jest.spyOn(todoRepository, 'findById')).toBeCalledTimes(1)
		expect(actualResp).toMatchSnapshot()
	})

	it('should test get method', async () => {
		jest.spyOn(todoRepository, 'findById').mockReturnValue(
			Promise.resolve(
				await JSON.parse(
					readResourceFromExactPath(
						__dirname + '/resources/Todo.json'
					)
				)
			)
		)
		const actualResp = await todoService.get(
			'defaultString',
			new Context(new UserContext('defaultString'), false)
		)
		expect(jest.spyOn(todoRepository, 'findById')).toBeCalledTimes(1)
		expect(actualResp).toMatchSnapshot()
	})

	it('should test select method', async () => {
		jest.spyOn(todoRepository, 'findAll').mockReturnValue(
			Promise.resolve([
				await JSON.parse(
					readResourceFromExactPath(
						__dirname + '/resources/Todo.json'
					)
				),
			])
		)
		const actualResp = await todoService.select(
			'defaultString',
			'defaultString',
			123,
			123,
			new Context(new UserContext('defaultString'), false)
		)
		expect(jest.spyOn(todoRepository, 'findAll')).toBeCalledTimes(1)
		expect(actualResp).toMatchSnapshot()
	})

	it('should test delete method', async () => {
		jest.spyOn(todoRepository, 'findById').mockReturnValue(
			Promise.resolve(
				await JSON.parse(
					readResourceFromExactPath(
						__dirname + '/resources/Todo.json'
					)
				)
			)
		)
		jest.spyOn(todoRepository, 'deleteById').mockImplementation(undefined)
		const actualResp = await todoService.delete(
			'defaultString',
			new Context(new UserContext('defaultString'), false)
		)
		expect(jest.spyOn(todoRepository, 'findById')).toBeCalledTimes(1)
		expect(jest.spyOn(todoRepository, 'deleteById')).toBeCalledTimes(1)
		expect(actualResp).toMatchSnapshot()
	})
})
