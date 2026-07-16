export class TaskResponseDto {
  id!: string;
  title!: string;
  description!: string | null;
  priority!: number;
  completed!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}
