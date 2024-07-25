import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { TaskFieldValuesService } from "./task-fields-values.service";
import { User } from "../users/user.decorator";
import { User as UserEntity } from "../users/entities/users.entity"
import { CreateTaskFieldValueDto } from "./dto/create-task-field-value.entity";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TaskFieldValue } from "./entities/task-fields-values.entity";

@ApiTags("Task Field Values")
@Controller('projects/:projectId/tasks/:taskId/field-values')
@UseGuards(JwtAuthGuard)
export class TaskFieldsValuesController {
    constructor(private readonly taskFieldsValuesService: TaskFieldValuesService) {}

    @ApiOperation({summary: 'Set task field value'})
    @ApiResponse({status: 200, type: TaskFieldValue})
    @Post()
    async setFieldValue(
        @Param('taskId') taskId: number,
        @Body() dto: CreateTaskFieldValueDto,
        @User() user: UserEntity
    ) {
        return this.taskFieldsValuesService.setFieldValue(taskId, dto, user.id);
    }

    @ApiOperation({summary: 'Get task field value by id'})
    @ApiResponse({status: 200, type: TaskFieldValue})
    @Get(':fieldId')
    async getFieldValue(
        @Param('taskId') taskId: number,
        @Param('fieldId') fieldId: number,
        @User() user: UserEntity
    ) {
        return this.taskFieldsValuesService.getFieldValue(taskId, fieldId, user.id);
    }

    @ApiOperation({summary: 'Delete task field by id'})
    @ApiResponse({status: 200, type: TaskFieldValue})
    @Delete(':fieldId')
    async removeFieldValue(
        @Param('taskId') taskId: number,
        @Param('fieldId') fieldId: number,
        @User() user: UserEntity
    ) {
        return this.taskFieldsValuesService.removeFieldValue(taskId, fieldId, user.id);
    }
}
