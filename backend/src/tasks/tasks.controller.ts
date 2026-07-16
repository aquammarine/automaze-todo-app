import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { TaskResponseDto } from './dto/task-response.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('')
  async create(
    @CurrentUser() user: { id: string },
    @Body() dto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    return await this.tasksService.create(dto, user.id);
  }
}
