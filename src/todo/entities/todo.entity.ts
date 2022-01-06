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
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
