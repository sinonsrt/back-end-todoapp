import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';

const todoEntityList = [
  new Todo({ task: 'task-1', is_done: 0, deleted_at: null }),
  new Todo({ task: 'task-1', is_done: 0, deleted_at: null }),
  new Todo({ task: 'task-1', is_done: 0, deleted_at: null }),
];
describe('TodoService', () => {
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getModelToken('Todo'),
          useValue: {
            find: jest.fn().mockResolvedValue(todoEntityList),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
          },
        },
      ],
    }).compile();

    todoService = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(todoService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a todo list', async () => {
      const result = await todoService.findAll();

      expect(result).toEqual(todoEntityList);
    });
  });
});
