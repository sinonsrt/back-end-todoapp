import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: true })
export class Todo {
  @Prop()
  @ApiProperty()
  task: string;

  @Prop({ max: [1, 'Valor inválido para o campo "Completo".'] })
  @ApiProperty()
  is_done: number;

  @Prop({ type: Date, default: null })
  @ApiProperty()
  deleted_at: Date;

  constructor(todo?: Partial<Todo>) {
    this.task = todo?.task;
    this.is_done = todo?.is_done;
    this.deleted_at = todo?.deleted_at;
  }
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
