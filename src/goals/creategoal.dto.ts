import {IsNotEmpty, IsString, IsDateString, IsOptional} from 'class-validator';

export class CreateGoalDto{
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsDateString()
    startDate: Date;

    @IsOptional()
    @IsDateString()
    deadline?: Date;
}