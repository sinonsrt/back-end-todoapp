import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}
  create(createTodoDto: CreateTodoDto) {
    const todo = new this.todoModel(createTodoDto);
    return todo.save();
  }

  findAll() {
    return this.todoModel.find().where('deleted_at', null);
  }

  findOne(id: string) {
    try {
      return this.todoModel.findById(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.todoModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        updateTodoDto,
      },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.todoModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          deleted_at: new Date(),
        },
      },
      {
        new: true,
      },
    );
  }
}
