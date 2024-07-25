import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TaskListsService } from "./task-lists.service";
import { CreateTaskListDto } from "./dto/create-task-list.dto";
import { User } from "../users/user.decorator";
import { User as UserEntity } from "../users/entities/users.entity"
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UpdateTaskListDto } from "./dto/update-task-list.dto";
import { TaskList } from "./entities/task-lists.entity";


@ApiTags('Task lists')
@UseGuards(JwtAuthGuard)
@Controller('task-lists')
export class TaskListsController {
    constructor(private readonly taskListService: TaskListsService) {}

    @ApiOperation({summary: 'Task list creation'})
    @ApiResponse({status: 200, type: TaskList})
    @Post()
    create(@Body() dto: CreateTaskListDto,
           @User() user: UserEntity) {
        return this.taskListService.create(dto, user.id);
    }

    @ApiOperation({summary: 'Get task list by id'})
    @ApiResponse({status: 200, type: TaskList})
    @Get(':id')
    getOneById(@Param('id', ParseIntPipe) id: number,
               @User() user: UserEntity) {
        return this.taskListService.getOneById(id, user.id);
    }

    @ApiOperation({summary: 'Update task list by id'})
    @ApiResponse({status: 200, type: TaskList})
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number,
           @Body() dto: UpdateTaskListDto,
           @User() user: UserEntity) {
        return this.taskListService.update(id, dto, user.id);
    }

    @ApiOperation({summary: 'Delete task list by id'})
    @ApiResponse({status: 200})
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number,
           @User() user: UserEntity) {
        return this.taskListService.delete(id, user.id);
    }
}
