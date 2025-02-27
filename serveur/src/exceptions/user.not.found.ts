import { HttpStatus } from '@nestjs/common';

import { TodoappCustomException } from './todoapp.custom.exception';

export class UserNotFound extends TodoappCustomException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
