import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateRoleDto {
    @ApiProperty({example: 'admin', description: 'Role name'})
    @IsString({message: 'Must be string'})
    @Length(3, Infinity, { message: 'Must be 3-16 characters long' })
    readonly value: string;

    @ApiProperty({example: 'admin', description: 'Role description'})
    @IsString({message: 'Must be string'})
    @Length(3, Infinity, { message: 'Must be 3-16 characters long' })
    readonly description: string;
}