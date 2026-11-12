import { IsOptional, IsString } from "class-validator";

export class EditUserDto{
    @IsString()
    @IsOptional()
    name: string | null;

    @IsString()
    @IsOptional()
    password: string | null;
} 