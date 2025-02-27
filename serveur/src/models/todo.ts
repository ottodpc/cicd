import { Schema } from '@nestjs/mongoose';

import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Todo {
  @Prop()
  @ApiProperty()
  title: string;

  @Prop()
  @ApiProperty()
  description: string;

  @Prop()
  @ApiProperty()
  todoId: string;

  @Prop()
  _id: string;
}

export const TodoSchema: SchemaFactory = SchemaFactory.createForClass(Todo);
