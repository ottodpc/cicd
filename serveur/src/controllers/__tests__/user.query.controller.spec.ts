import { UserService } from '../../services/user.service';
import { UserQueryController } from '../user.query.controller';
import { readResourceFromExactPath } from '../../../test/utils';
import { UserContext } from '../../entities/usercontext';
import { Context } from '../../entities/context';
describe('should test userQueryController', () => {
  let userQueryController: UserQueryController;
  let userService: UserService;

  beforeEach(async () => {
    userService = {
      get: jest.fn(),
      select: jest.fn(),
    } as unknown as UserService;
    userQueryController = new UserQueryController(userService);
  });

  it('should test get method', async () => {
    jest
      .spyOn(userService, 'get')
      .mockReturnValue(
        Promise.resolve(
          await JSON.parse(
            readResourceFromExactPath(__dirname + '/resources/User.json'),
          ),
        ),
      );
    const actualResp = await userQueryController.get(
      'defaultString',
      new Context(new UserContext('defaultString'), false),
    );
    expect(jest.spyOn(userService, 'get')).toBeCalledTimes(1);
    expect(actualResp).toMatchSnapshot();
  });

  it('should test select method', async () => {
    jest
      .spyOn(userService, 'select')
      .mockReturnValue(
        Promise.resolve(
          await JSON.parse(
            readResourceFromExactPath(__dirname + '/resources/User.json'),
          ),
        ),
      );
    const actualResp = await userQueryController.select(
      'defaultString',
      'defaultString',
      123,
      123,
      new Context(new UserContext('defaultString'), false),
    );
    expect(jest.spyOn(userService, 'select')).toBeCalledTimes(1);
    expect(actualResp).toMatchSnapshot();
  });
});
