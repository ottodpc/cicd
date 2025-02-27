import { TodoService } from '../../services/todo.service';
import { TodoController } from '../todo.mutation.controller';
import { readResourceFromExactPath } from '../../../test/utils';
import { UserContext } from '../../entities/usercontext';
import { Context } from '../../entities/context';
import { Response } from 'express';
describe('should test todoController', () => {
  let todoController: TodoController;
  let mockResponse: Response<any, Record<string, any>>;
  let todoService: TodoService;

  beforeEach(async () => {
    mockResponse = {
      setHeader: jest.fn(),
      json: jest.fn(),
    } as unknown as Response<any, Record<string, any>>;
    todoService = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as TodoService;
    todoController = new TodoController(todoService);
  });

  it('should test create method', async () => {
    jest.spyOn(mockResponse, 'setHeader').mockImplementation(undefined);
    jest.spyOn(mockResponse, 'json').mockImplementation(undefined);
    jest
      .spyOn(todoService, 'create')
      .mockReturnValue(
        Promise.resolve(
          await JSON.parse(
            readResourceFromExactPath(__dirname + '/resources/Todo.json'),
          ),
        ),
      );
    const actualResp = await todoController.create(
      await JSON.parse(
        readResourceFromExactPath(
          __dirname + '/resources/createTodoInput.json',
        ),
      ),
      new Context(new UserContext('defaultString'), false),
      mockResponse,
    );
    expect(jest.spyOn(mockResponse, 'setHeader')).toBeCalledTimes(1);
    expect(jest.spyOn(mockResponse, 'json')).toBeCalledTimes(1);
    expect(jest.spyOn(todoService, 'create')).toBeCalledTimes(1);
    expect(actualResp).toMatchSnapshot();
  });

  it('should test update method', async () => {
    jest.spyOn(mockResponse, 'setHeader').mockImplementation(undefined);
    jest.spyOn(mockResponse, 'json').mockImplementation(undefined);
    jest
      .spyOn(todoService, 'update')
      .mockReturnValue(
        Promise.resolve(
          await JSON.parse(
            readResourceFromExactPath(__dirname + '/resources/Todo.json'),
          ),
        ),
      );
    const actualResp = await todoController.update(
      'defaultString',
      await JSON.parse(
        readResourceFromExactPath(
          __dirname + '/resources/updateTodoInput.json',
        ),
      ),
      new Context(new UserContext('defaultString'), false),
      mockResponse,
    );
    expect(jest.spyOn(mockResponse, 'setHeader')).toBeCalledTimes(1);
    expect(jest.spyOn(mockResponse, 'json')).toBeCalledTimes(1);
    expect(jest.spyOn(todoService, 'update')).toBeCalledTimes(1);
    expect(actualResp).toMatchSnapshot();
  });

  it('should test delete method', async () => {
    jest
      .spyOn(todoService, 'delete')
      .mockReturnValue(
        Promise.resolve(
          await JSON.parse(
            readResourceFromExactPath(__dirname + '/resources/Todo.json'),
          ),
        ),
      );
    const actualResp = await todoController.delete(
      'defaultString',
      new Context(new UserContext('defaultString'), false),
    );
    expect(jest.spyOn(todoService, 'delete')).toBeCalledTimes(1);
    expect(actualResp).toMatchSnapshot();
  });
});
