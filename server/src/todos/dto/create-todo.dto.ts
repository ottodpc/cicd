import { IsString, MinLength, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @MinLength(3, {
    message: 'Title must be at least 3 characters long',
  })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}
