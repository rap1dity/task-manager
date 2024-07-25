import { IsNumber, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectDto {
    @ApiProperty({example: 'trello', description: 'Project title'})
    @IsString()
    @Length(4, 16, { message: 'Must be at least 5 characters' })
    readonly title: string;

    @ApiProperty({example: 'some info', description: 'Project description'})
    @IsString()
    readonly description: string;
}