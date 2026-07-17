import { Controller, Get, Post, Patch, Delete, Param, Query, UseGuards, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { TaskResponseDto } from './dto/task-response.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(
    @CurrentUser() user: { id: string },
    @Query() filter: TaskFilterDto,
  ): Promise<TaskResponseDto[]> {
    return await this.tasksService.findAll(user.id, {
      completion: filter.completion,
      title: filter.title,
      priorityOrder: filter.priorityOrder,
    });
  }

  @Get(':id')
  async findById(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
  ): Promise<TaskResponseDto> {
    return await this.tasksService.findById(id, user.id);
  }

  @Post()
  async create(
    @CurrentUser() user: { id: string },
    @Body() dto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    return await this.tasksService.create(dto, user.id);
  }

  @Patch(':id')
  async update(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return await this.tasksService.update(id, user.id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
  ): Promise<void> {
    await this.tasksService.delete(id, user.id);
  }
}
