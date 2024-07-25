import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./entities/users.entity";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({summary: 'User creation'})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    @ApiOperation({summary: 'Get Concrete User'})
    @ApiResponse({status: 200, type: User})
    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number){
      return this.usersService.getOneById(id);
    }

    @ApiOperation({summary: 'Update user'})
    @ApiResponse({status: 200, type: User})
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: CreateUserDto
    ){
        return this.usersService.update(id, dto);
    }

    @ApiOperation({summary: 'Delete user'})
    @ApiResponse({status: 200})
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number){
        return this.usersService.delete(id);
    }

}
