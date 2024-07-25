import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { TaskFieldsService } from "./task-fields.service";
import { CreateTaskFieldDto } from "./dto/create-task-field.dto";
import { User } from "../users/user.decorator";
import { User as UserEntity } from "../users/entities/users.entity";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TaskField } from "./entities/task-fields.entity";

@ApiTags("Task fields")
@Controller('projects/:projectId/task-fields')
@UseGuards(JwtAuthGuard)
export class TaskFieldsController {
    constructor(private readonly taskFieldService: TaskFieldsService) {}

    @ApiOperation({summary: 'Task field creation'})
    @ApiResponse({status: 200, type: TaskField})
    @Post()
    create(@Body() dto: CreateTaskFieldDto,
           @User() user: UserEntity){
        return this.taskFieldService.create(dto, user.id)
    }

    @ApiOperation({summary: 'Get task field by id'})
    @ApiResponse({status: 200, type: TaskField})
    @Get(':projectId')
    findAll(@Param('projectId', ParseIntPipe) projectId: number,
            @User() user: UserEntity){
        return this.taskFieldService.getAll(projectId, user.id);
    }

    @ApiOperation({summary: 'Update task field by id'})
    @ApiResponse({status: 200, type: TaskField})
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number,
           @Body() dto: CreateTaskFieldDto,
           @User() user: UserEntity){
        return this.taskFieldService.update(id, dto, user.id);
    }

    @ApiOperation({summary: 'Delete task field by id'})
    @ApiResponse({status: 200, type: TaskField})
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number,
           @User() user: UserEntity){
        return this.taskFieldService.remove(id, user.id);
    }

}
