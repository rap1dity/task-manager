import { ArrayNotEmpty, IsArray, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskFieldDto {

    @ApiProperty({example: 'Priority', description: 'Title of task field'})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({example: 'list', description: 'Task field type'})
    @IsString()
    @IsIn(['number', 'string', 'list'])
    type: 'string' | 'number' | 'list';

    @ApiProperty({example: 1, description: 'Parent project id'})
    @IsNotEmpty()
    @IsNumber()
    projectId: number;

    @ApiProperty({example: ['low','medium','high'], description: 'Task field available options if type is list'})
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    options?: string[];
}