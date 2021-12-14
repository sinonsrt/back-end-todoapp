import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop()
  task: string;

  @Prop({ max: [1, 'Valor inválido para o campo "Completo".'] })
  is_done: number;

  @Prop({ type: Date, default: null })
  deleted_at: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
