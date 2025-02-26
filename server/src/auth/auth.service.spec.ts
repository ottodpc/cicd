import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

const mockUser = {
  _id: '1',
  username: 'test',
  password: 'hashedPassword',
};

const mockUsersService = {
  create: jest.fn(),
  findByUsername: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        JwtService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should register a user with hashed password', async () => {
    const registerDto: RegisterDto = {
      username: 'test',
      password: 'plainPassword',
    };

    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as never);
    mockUsersService.create.mockResolvedValue(mockUser);

    const result = await service.register(registerDto);
    expect(bcrypt.hash).toHaveBeenCalledWith('plainPassword', 10);
    expect(result).toEqual(mockUser);
  });
});
