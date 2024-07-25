import { IsNotEmpty, IsString, IsNumber, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskFieldValueDto {
    @ApiProperty({example: 1, description: 'Identifier of task field'})
    @IsNotEmpty()
    fieldId: number;

    @ApiProperty({example: 'list', description: 'Field value type'})
    @IsNotEmpty()
    @IsIn(['string', 'number', 'list'])
    fieldType: 'string' | 'number' | 'list';

    @ApiProperty({example: 'task title', description: 'string field value'})
    @IsOptional()
    @IsString()
    stringValue?: string;

    @ApiProperty({example: 24, description: 'number field value'})
    @IsOptional()
    @IsNumber()
    numericValue?: number;

    @ApiProperty({example: 'high', description: 'list field value'})
    @IsOptional()
    @IsString()
    listValue?: string;
}
