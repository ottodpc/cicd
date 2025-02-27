import { TodoService } from '../../services/todo.service';
import { TodoQueryController } from '../todo.query.controller';
import { readResourceFromExactPath } from '../../../test/utils';

describe('should test todoQueryController', () => {
  let todoQueryController: TodoQueryController;
  let todoService: TodoService;

  beforeEach(async () => {
    todoService = {
      get: jest.fn(),
      select: jest.fn(),
    } as unknown as TodoService;
    todoQueryController = new TodoQueryController(todoService);
  });

  it('should test get method', async () => {
    jest
      .spyOn(todoService, 'get')
      .mockReturnValue(
        Promise.resolve(
          await JSON.parse(
            readResourceFromExactPath(__dirname + '/resources/Todo.json'),
          ),
        ),
      );
    const actualResp = await todoQueryController.get('defaultString');
    expect(jest.spyOn(todoService, 'get')).toBeCalledTimes(1);
    expect(actualResp).toMatchSnapshot();
  });

  it('should test select method', async () => {
    jest
      .spyOn(todoService, 'select')
      .mockReturnValue(
        Promise.resolve(
          await JSON.parse(
            readResourceFromExactPath(__dirname + '/resources/Todo.json'),
          ),
        ),
      );
    const actualResp = await todoQueryController.select(
      'defaultString',
      'defaultString',
      123,
      123,
    );
    expect(jest.spyOn(todoService, 'select')).toBeCalledTimes(1);
    expect(actualResp).toMatchSnapshot();
  });
});
