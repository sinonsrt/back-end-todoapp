import { OmitType } from '@nestjs/swagger';
import { Todo } from '../entities/todo.entity';

export class IndexTodoSwagger extends OmitType(Todo, []) {}
