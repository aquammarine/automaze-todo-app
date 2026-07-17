import { Controller, Get, Post, Patch, Delete, Param, Query, UseGuards, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiCookieAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { TaskResponseDto } from './dto/task-response.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';

@ApiTags('tasks')
@ApiCookieAuth('access_token')
@ApiResponse({ status: 401, description: 'Not authenticated' })
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Get all tasks for current user' })
  @ApiResponse({ status: 200, type: [TaskResponseDto] })
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

  @ApiOperation({ summary: 'Get task by id' })
  @ApiParam({ name: 'id', example: 'clx1abc123' })
  @ApiResponse({ status: 200, type: TaskResponseDto })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @Get(':id')
  async findById(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
  ): Promise<TaskResponseDto> {
    return await this.tasksService.findById(id, user.id);
  }

  @ApiOperation({ summary: 'Create a task' })
  @ApiResponse({ status: 201, type: TaskResponseDto })
  @Post()
  async create(
    @CurrentUser() user: { id: string },
    @Body() dto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    return await this.tasksService.create(dto, user.id);
  }

  @ApiOperation({ summary: 'Update a task' })
  @ApiParam({ name: 'id', example: 'clx1abc123' })
  @ApiResponse({ status: 200, type: TaskResponseDto })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @Patch(':id')
  async update(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return await this.tasksService.update(id, user.id, dto);
  }

  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', example: 'clx1abc123' })
  @ApiResponse({ status: 204, description: 'Deleted' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
  ): Promise<void> {
    await this.tasksService.delete(id, user.id);
  }
}
