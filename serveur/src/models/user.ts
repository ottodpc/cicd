import { Schema } from '@nestjs/mongoose';

import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Todo } from './todo';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  @ApiProperty()
  username: string;

  @Prop()
  @ApiProperty({ type: Todo, isArray: true })
  @ValidateNested({ each: true })
  @Type(() => Todo)
  todos: Todo[];

  @Prop()
  @ApiProperty()
  password: string[];

  @Prop()
  @ApiProperty()
  userId: string;

  @Prop()
  @ApiProperty()
  _id: string;
}

export const UserSchema: SchemaFactory = SchemaFactory.createForClass(User);
