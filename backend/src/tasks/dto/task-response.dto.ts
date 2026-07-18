import { ApiProperty } from '@nestjs/swagger';

export class TaskResponseDto {
  @ApiProperty({ example: 'clx1abc123' })
  id!: string;

  @ApiProperty({ example: 'Buy groceries' })
  title!: string;

  @ApiProperty({ example: 'Milk, eggs, bread', nullable: true })
  description!: string | null;

  @ApiProperty({ example: 5, minimum: 1, maximum: 10 })
  priority!: number;

  @ApiProperty({ example: false })
  completed!: boolean;

  @ApiProperty({ example: '2026-07-25T00:00:00.000Z', nullable: true })
  dueDate!: Date | null;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt!: Date;
}
