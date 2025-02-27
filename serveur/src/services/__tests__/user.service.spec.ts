import { UserRepository } from '../../repositories/user.repository'
import { UserService } from '../user.service'
import { User } from '../../models/user'
import { readResourceFromExactPath } from '../../../test/utils'
import { CreateUserInput } from '../../inputs/user.input'
import { UserContext } from '../../entities/usercontext'
import { Context } from '../../entities/context'
import { UpdateUserInput } from '../../inputs/user.update'
describe('should test userService', () => {
	let userService: UserService
	let userRepository: UserRepository

	beforeEach(async () => {
		userRepository = {
			save: jest.fn(),
			findById: jest.fn(),
			findAll: jest.fn(),
			deleteById: jest.fn(),
		} as unknown as UserRepository
		userService = new UserService(userRepository)
	})

	it('should test create method', async () => {
		jest.spyOn(userRepository, 'save').mockReturnValue(
			Promise.resolve(
				await JSON.parse(
					readResourceFromExactPath(
						__dirname + '/resources/User.json'
					)
				)
			)
		)
		const actualResp = await userService.create(
			'defaultString',
			await JSON.parse(
				readResourceFromExactPath(
					__dirname + '/resources/createUserInput.json'
				)
			),
			new Context(new UserContext('defaultString'), false)
		)
		expect(jest.spyOn(userRepository, 'save')).toBeCalledTimes(1)
		expect(actualResp).toMatchSnapshot()
	})

	it('should test update method', async () => {
		jest.spyOn(userRepository, 'save').mockReturnValue(
			Promise.resolve(
				await JSON.parse(
					readResourceFromExactPath(
						__dirname + '/resources/User.json'
					)
				)
			)
		)
		jest.spyOn(userRepository, 'findById').mockReturnValue(
			Promise.resolve(
				await JSON.parse(
					readResourceFromExactPath(
						__dirname + '/resources/User.json'
					)
				)
			)
		)
		const actualResp = await userService.update(
			'defaultString',
			await JSON.parse(
				readResourceFromExactPath(
					__dirname + '/resources/updateUserInput.json'
				)
			),
			new Context(new UserContext('defaultString'), false)
		)
		expect(jest.spyOn(userRepository, 'save')).toBeCalledTimes(1)
		expect(jest.spyOn(userRepository, 'findById')).toBeCalledTimes(1)
		expect(actualResp).toMatchSnapshot()
	})

	it('should test get method', async () => {
		jest.spyOn(userRepository, 'findById').mockReturnValue(
			Promise.resolve(
				await JSON.parse(
					readResourceFromExactPath(
						__dirname + '/resources/User.json'
					)
				)
			)
		)
		const actualResp = await userService.get(
			'defaultString',
			new Context(new UserContext('defaultString'), false)
		)
		expect(jest.spyOn(userRepository, 'findById')).toBeCalledTimes(1)
		expect(actualResp).toMatchSnapshot()
	})

	it('should test select method', async () => {
		jest.spyOn(userRepository, 'findAll').mockReturnValue(
			Promise.resolve([
				await JSON.parse(
					readResourceFromExactPath(
						__dirname + '/resources/User.json'
					)
				),
			])
		)
		const actualResp = await userService.select(
			'defaultString',
			'defaultString',
			123,
			123,
			new Context(new UserContext('defaultString'), false)
		)
		expect(jest.spyOn(userRepository, 'findAll')).toBeCalledTimes(1)
		expect(actualResp).toMatchSnapshot()
	})

	it('should test delete method', async () => {
		jest.spyOn(userRepository, 'findById').mockReturnValue(
			Promise.resolve(
				await JSON.parse(
					readResourceFromExactPath(
						__dirname + '/resources/User.json'
					)
				)
			)
		)
		jest.spyOn(userRepository, 'deleteById').mockImplementation(undefined)
		const actualResp = await userService.delete(
			'defaultString',
			new Context(new UserContext('defaultString'), false)
		)
		expect(jest.spyOn(userRepository, 'findById')).toBeCalledTimes(1)
		expect(jest.spyOn(userRepository, 'deleteById')).toBeCalledTimes(1)
		expect(actualResp).toMatchSnapshot()
	})
})
