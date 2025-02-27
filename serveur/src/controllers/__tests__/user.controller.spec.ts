import { UserService } from '../../services/user.service';
import { UserController } from '../user.mutation.controller';
import { readResourceFromExactPath } from '../../../test/utils';
import { UserContext } from '../../entities/usercontext';
import { Context } from '../../entities/context';
import { Response } from 'express';
describe('should test userController', () => {
  let userController: UserController;
  let mockResponse: Response<any, Record<string, any>>;
  let userService: UserService;

  beforeEach(async () => {
    mockResponse = {
      setHeader: jest.fn(),
      json: jest.fn(),
    } as unknown as Response<any, Record<string, any>>;
    userService = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as UserService;
    userController = new UserController(userService);
  });

  it('should test create method', async () => {
    jest.spyOn(mockResponse, 'setHeader').mockImplementation(undefined);
    jest.spyOn(mockResponse, 'json').mockImplementation(undefined);
    jest
      .spyOn(userService, 'create')
      .mockReturnValue(
        Promise.resolve(
          await JSON.parse(
            readResourceFromExactPath(__dirname + '/resources/User.json'),
          ),
        ),
      );
    const actualResp = await userController.create(
      await JSON.parse(
        readResourceFromExactPath(
          __dirname + '/resources/createUserInput.json',
        ),
      ),
      new Context(new UserContext('defaultString'), false),
      mockResponse,
    );
    expect(jest.spyOn(mockResponse, 'setHeader')).toBeCalledTimes(1);
    expect(jest.spyOn(mockResponse, 'json')).toBeCalledTimes(1);
    expect(jest.spyOn(userService, 'create')).toBeCalledTimes(1);
    expect(actualResp).toMatchSnapshot();
  });

  it('should test update method', async () => {
    jest.spyOn(mockResponse, 'setHeader').mockImplementation(undefined);
    jest.spyOn(mockResponse, 'json').mockImplementation(undefined);
    jest
      .spyOn(userService, 'update')
      .mockReturnValue(
        Promise.resolve(
          await JSON.parse(
            readResourceFromExactPath(__dirname + '/resources/User.json'),
          ),
        ),
      );
    const actualResp = await userController.update(
      'defaultString',
      await JSON.parse(
        readResourceFromExactPath(
          __dirname + '/resources/updateUserInput.json',
        ),
      ),
      new Context(new UserContext('defaultString'), false),
      mockResponse,
    );
    expect(jest.spyOn(mockResponse, 'setHeader')).toBeCalledTimes(1);
    expect(jest.spyOn(mockResponse, 'json')).toBeCalledTimes(1);
    expect(jest.spyOn(userService, 'update')).toBeCalledTimes(1);
    expect(actualResp).toMatchSnapshot();
  });

  it('should test delete method', async () => {
    jest
      .spyOn(userService, 'delete')
      .mockReturnValue(
        Promise.resolve(
          await JSON.parse(
            readResourceFromExactPath(__dirname + '/resources/User.json'),
          ),
        ),
      );
    const actualResp = await userController.delete(
      'defaultString',
      new Context(new UserContext('defaultString'), false),
    );
    expect(jest.spyOn(userService, 'delete')).toBeCalledTimes(1);
    expect(actualResp).toMatchSnapshot();
  });
});
