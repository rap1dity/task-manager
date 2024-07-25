import { IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

  @ApiProperty({example: 'timeworstseal', description: 'Username'})
  @IsString({message: 'Must be string'})
    @Length(4, 16, { message: 'Must be at least 5 characters' })
  readonly username: string;

  @ApiProperty({example: 'pass123', description: 'Password'})
  @IsString({message: 'Must be string'})
  @Length(4, 16, {message: 'Must be 5-16 characters long'})
  readonly password: string;
}