import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString, Length, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateTaskFieldValueDto } from "../../task-fields-values/dto/create-task-field-value.entity";


export class CreateTaskDto {
    @ApiProperty({example: 'Tech report #143', description: 'Task title'})
    @IsString()
    @Length(4, 16, { message: 'Must be at least 4 characters' })
    readonly title: string;

    @ApiProperty({example: 'Fix transparent background', description: 'Task description'})
    @IsString()
    readonly description: string;

    @ApiProperty({example: 14, description: 'Task order in taskList'})
    @IsNumber()
    readonly order: number;

    @ApiProperty({example: 43, description: 'TaskList id for task'})
    @IsNumber()
    readonly taskListId: number;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreateTaskFieldValueDto)
    fieldValues: CreateTaskFieldValueDto[];
}