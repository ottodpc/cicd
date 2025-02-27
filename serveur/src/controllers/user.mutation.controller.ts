import { Controller } from '@nestjs/common';
import { Response } from 'express';
import { v4 } from 'uuid';
import { Post } from '@nestjs/common';
import { HttpCode } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { CreateUserInput, LoginInput } from '../inputs/user.input';
import { ContextDecor } from '../configurations/context.decorator';
import { Context } from '../entities/context';
import { Res } from '@nestjs/common';

import { Put } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { UpdateUserInput } from '../inputs/user.update';
import { Delete } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Logger } from '@nestjs/common';
@Controller('/v1/')
export class UserController {
  readonly logger: Logger = new Logger(this.constructor.name);

  @Post('users')
  @HttpCode(200)
  async create(
    @Body(new ValidationPipe()) createUserInput: CreateUserInput,
    @ContextDecor() context: Context,
    @Res() response: Response,
  ) {
    this.logger.log(`Received a new create request `);
    const userId = v4();
    const created = await this.userService.create(userId, createUserInput);
    response.setHeader('Location', '/v1/users/' + userId);
    response.json(created);
    this.logger.log(`Create request for User ${userId} is complete`);
    return response;
  }

  @Post('users/login')
  @HttpCode(200)
  async login(@Body() loginInput: LoginInput, @Res() response: Response) {
    const user = await this.userService.login(
      loginInput.username,
      loginInput.password,
    );
    if (user) {
      response.setHeader('Location', '/v1/users/' + user._id);
      response.json(user);
      this.logger.log(`Update request for ${user._id} is complete`);
      return response;
    } else {
      response.setHeader('Location', '/v1/users/');
      response.json({ message: 'User not found' });
      return response;
    }
  }

  @Put('users/:userId')
  async update(
    @Param('userId') userId: string,
    @Body(new ValidationPipe()) updateUserInput: UpdateUserInput,
    @ContextDecor() context: Context,
    @Res() response: Response,
  ) {
    this.logger.log(`Received a update request for : ${userId}`);
    const updtedUser = await this.userService.update(
      userId,
      updateUserInput,
      context,
    );
    response.setHeader('Location', '/v1/users/' + userId);
    response.json(updtedUser);
    this.logger.log(`Update request for  is complete: ${userId}`);
    return response;
  }

  @Delete('users/:userId')
  async delete(@Param('userId') userId: string) {
    this.logger.log(`Received a delete request for : ${userId} `);
    await this.userService.delete(userId);
    this.logger.log(`Delete request completed for  ${userId} is complete `);
  }

  constructor(private userService: UserService) {}
}
