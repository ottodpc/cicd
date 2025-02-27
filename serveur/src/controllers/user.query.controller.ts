import { Controller } from '@nestjs/common';
import { DefaultValuePipe } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { PageInfo } from '../entities/pageinfo';
import { PagedResponse } from '../entities/pagedresponse';
import { ApiQuery } from '@nestjs/swagger';
import { Query } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Logger } from '@nestjs/common';
@Controller('/v1/')
export class UserQueryController {
  readonly logger: Logger = new Logger(this.constructor.name);

  @Get('users/:userId')
  async get(@Param('userId') userId: string) {
    this.logger.log(`Received a get request for User: ${userId}`);
    const existingUser = await this.userService.get(userId);
    this.logger.log(`Get request for User ${userId} is complete `);
    return existingUser;
  }

  @Get('users')
  @ApiQuery({ name: 'filters', required: false })
  @ApiQuery({ name: 'sortFields', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  async select(
    @Query('filters', new DefaultValuePipe('')) filters: string,
    @Query('sortFields', new DefaultValuePipe('')) sortFields: string,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
    @Query('offset', new DefaultValuePipe(0)) offset: number,
  ) {
    this.logger.log(
      `Received a selectAll request for User with filters: ${filters} sort: ${sortFields} limit: ${limit} offset: ${offset}`,
    );
    const response = await this.userService.select(
      filters,
      sortFields,
      limit,
      offset,
    );
    this.logger.log(
      `SelectAll request for User with filters: ${filters} sort: ${sortFields} limit: ${limit} offset: ${offset} is complete `,
    );
    const pageInfo = new PageInfo(limit, offset);
    return new PagedResponse(response, pageInfo);
  }

  constructor(private userService: UserService) {}
}
