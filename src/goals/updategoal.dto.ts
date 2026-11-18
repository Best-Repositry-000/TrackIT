import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class UpdateGoalDto {
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsString()
  description?: string;

  @IsDateString()
  startDate?: Date | null;

  @IsDateString()
  deadline?: Date | null;
}