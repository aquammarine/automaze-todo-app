import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { CompletionFilter } from './enums/completion-filter.enum';
import { SortOrder } from './enums/sort-order.enum';

jest.mock('./tasks.repository');

const mockRepo = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
};

const mockTask = {
  id: 'task-1',
  title: 'Buy groceries',
  description: null,
  priority: 5,
  completed: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('delegates to repository with userId', async () => {
      mockRepo.create.mockResolvedValue(mockTask);

      const result = await service.create({ title: 'Buy groceries', priority: 5 }, 'user-1');

      expect(mockRepo.create).toHaveBeenCalledWith({ title: 'Buy groceries', priority: 5, userId: 'user-1' });
      expect(result).toEqual(mockTask);
    });
  });

  describe('update', () => {
    it('returns updated task', async () => {
      const updated = { ...mockTask, title: 'Updated' };
      mockRepo.update.mockResolvedValue(updated);

      const result = await service.update('task-1', 'user-1', { title: 'Updated' });

      expect(result).toEqual(updated);
    });

    it('throws NotFoundException if task not found', async () => {
      mockRepo.update.mockResolvedValue(null);

      await expect(service.update('bad-id', 'user-1', { title: 'x' }))
        .rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('deletes task successfully', async () => {
      mockRepo.delete.mockResolvedValue({ count: 1 });

      await expect(service.delete('task-1', 'user-1')).resolves.not.toThrow();
      expect(mockRepo.delete).toHaveBeenCalledWith('task-1', 'user-1');
    });

    it('throws NotFoundException if no rows deleted', async () => {
      mockRepo.delete.mockResolvedValue({ count: 0 });

      await expect(service.delete('bad-id', 'user-1'))
        .rejects.toThrow(NotFoundException);
    });
  });

  describe('findById', () => {
    it('returns task when found', async () => {
      mockRepo.findById.mockResolvedValue(mockTask);

      const result = await service.findById('task-1', 'user-1');

      expect(result).toEqual(mockTask);
    });

    it('throws NotFoundException if not found', async () => {
      mockRepo.findById.mockResolvedValue(null);

      await expect(service.findById('bad-id', 'user-1'))
        .rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('passes completed=undefined for ALL filter', async () => {
      mockRepo.findAll.mockResolvedValue([mockTask]);

      await service.findAll('user-1', { completion: CompletionFilter.ALL });

      expect(mockRepo.findAll).toHaveBeenCalledWith('user-1', {
        completed: undefined,
        title: undefined,
        priorityOrder: undefined,
      });
    });

    it('passes completed=true for DONE filter', async () => {
      mockRepo.findAll.mockResolvedValue([]);

      await service.findAll('user-1', { completion: CompletionFilter.DONE });

      expect(mockRepo.findAll).toHaveBeenCalledWith('user-1', expect.objectContaining({ completed: true }));
    });

    it('passes completed=false for UNDONE filter', async () => {
      mockRepo.findAll.mockResolvedValue([]);

      await service.findAll('user-1', { completion: CompletionFilter.UNDONE });

      expect(mockRepo.findAll).toHaveBeenCalledWith('user-1', expect.objectContaining({ completed: false }));
    });

    it('defaults to ALL when no options passed', async () => {
      mockRepo.findAll.mockResolvedValue([mockTask]);

      await service.findAll('user-1');

      expect(mockRepo.findAll).toHaveBeenCalledWith('user-1', expect.objectContaining({ completed: undefined }));
    });

    it('forwards title and priorityOrder', async () => {
      mockRepo.findAll.mockResolvedValue([]);

      await service.findAll('user-1', { title: 'grocery', priorityOrder: SortOrder.DESC });

      expect(mockRepo.findAll).toHaveBeenCalledWith('user-1', expect.objectContaining({
        title: 'grocery',
        priorityOrder: SortOrder.DESC,
      }));
    });
  });
});
