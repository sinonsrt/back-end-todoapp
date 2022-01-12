import { Test, TestingModule } from '@nestjs/testing';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

const todoEntityList: Todo[] = [
  new Todo({
    task: 'Tarefa 1',
    is_done: 1,
    deleted_at: null,
  }),
  new Todo({
    task: 'Tarefa 2',
    is_done: 1,
    deleted_at: null,
  }),
  new Todo({
    task: 'Tarefa 2',
    is_done: 1,
    deleted_at: null,
  }),
];

const todoEntity = new Todo({
  task: 'new task',
  is_done: 0,
  deleted_at: null,
});

const updatedTodoEntity = new Todo({
  task: 'new task 2',
  is_done: 1,
  deleted_at: null,
});
describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(todoEntityList),
            create: jest.fn().mockResolvedValue(todoEntity),
            findOne: jest.fn().mockResolvedValue(todoEntity),
            update: jest.fn().mockResolvedValue(updatedTodoEntity),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    todoController = module.get<TodoController>(TodoController);
    todoService = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(todoController).toBeDefined();
    expect(todoService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of todo', async () => {
      // Act
      const result = await todoController.findAll();

      // Assert
      expect(result).toEqual(todoEntityList);
      expect(typeof result).toEqual('object');
      expect(todoService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', async () => {
      // Arrange
      jest.spyOn(todoService, 'findAll').mockRejectedValueOnce(new Error());

      // Assert
      expect(todoController.findAll()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const body: CreateTodoDto = {
      task: 'new task',
      is_done: 0,
      deleted_at: null,
    };

    it('should create a new todo', async () => {
      const result = await todoController.create(body);

      expect(result).toEqual(todoEntity);
      expect(todoService.create).toHaveBeenCalledTimes(1);
      expect(todoService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      jest.spyOn(todoService, 'create').mockRejectedValueOnce(new Error());

      expect(todoController.create(body)).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should get a todo', async () => {
      const result = await todoController.findOne('1');

      expect(result).toEqual(todoEntity);
      expect(todoService.findOne).toHaveBeenCalledTimes(1);
      expect(todoService.findOne).toBeCalledWith('1');
    });

    it('should throw an exception', () => {
      jest.spyOn(todoService, 'findOne').mockRejectedValueOnce(new Error());

      expect(todoController.findOne('1')).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const body: UpdateTodoDto = {
      task: 'new task 2',
      is_done: 1,
      deleted_at: null,
    };

    it('should update a todo', async () => {
      const result = await todoController.update('1', body);

      expect(result).toEqual(updatedTodoEntity);
      expect(todoService.update).toHaveBeenCalledTimes(1);
      expect(todoService.update).toBeCalledWith('1', body);
    });

    it('should throw an exception', () => {
      jest.spyOn(todoService, 'update').mockRejectedValueOnce(new Error());

      expect(todoController.update('1', body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a todo', async () => {
      const result = await todoController.remove('1');

      expect(result).toBeUndefined();
      expect(todoService.remove).toHaveBeenCalledTimes(1);
      expect(todoService.remove).toBeCalledWith('1');
    });

    it('should throw an exception', () => {
      jest.spyOn(todoService, 'remove').mockRejectedValueOnce(new Error());

      expect(todoController.remove('1')).rejects.toThrowError();
    });
  });
});
