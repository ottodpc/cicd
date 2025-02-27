import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoInput {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}
