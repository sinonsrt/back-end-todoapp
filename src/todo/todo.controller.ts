import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexTodoSwagger } from './swagger/index-todo.swagger';

@Controller('todo')
@ApiTags('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar uma tarefa' })
  @ApiResponse({
    status: 201,
    description: 'Cadastrado tarefa',
    type: IndexTodoSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Pâmetros inválidos',
  })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as tarefas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tarefas',
    type: IndexTodoSwagger,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Pâmetros inválidos' })
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma tarefa por ID' })
  @ApiResponse({ status: 200, description: 'Dados da tarefa' })
  @ApiResponse({
    status: 404,
    description: 'Pâmetros inválidos - Não encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar os dados de uma tarefa' })
  @ApiResponse({
    status: 200,
    description: 'Atualizado tarefa',
    type: IndexTodoSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Pâmetros inválidos - Não encontrado',
  })
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma tarefa' })
  @ApiResponse({ status: 200, description: 'Removido tarefa' })
  @ApiResponse({
    status: 404,
    description: 'Pâmetros inválidos - Não encontrado',
  })
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
