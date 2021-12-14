import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  task: string;

  @IsIn([0, 1])
  @IsNotEmpty()
  @ApiPropertyOptional()
  is_done: number;
  deleted_at: Date;
}
