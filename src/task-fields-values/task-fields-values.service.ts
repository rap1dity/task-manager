import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTaskFieldValueDto } from "./dto/create-task-field-value.entity";
import { TaskService } from "../tasks/tasks.service";
import { TaskFieldsService } from "../task-fields/task-fields.service";
import { TaskFieldValue } from "./entities/task-fields-values.entity";


@Injectable()
export class TaskFieldValuesService {
    constructor(
        @InjectRepository(TaskFieldValue)
        private readonly taskFieldValueRepository: Repository<TaskFieldValue>,
        @Inject(forwardRef(() => TaskService))
        private readonly tasksService: TaskService,
        private readonly taskFieldsService: TaskFieldsService,
    ) {}

    async setFieldValue(taskId: number, dto: CreateTaskFieldValueDto, userId: number): Promise<TaskFieldValue> {
        const task = await this.tasksService.getOneById(taskId, userId);
        const field = await this.taskFieldsService.getOneById(dto.fieldId, userId);

        let fieldValue = await this.taskFieldValueRepository.findOne({ where: { task, taskField: field } });

        if (!fieldValue) {
            fieldValue = this.taskFieldValueRepository.create({ task, taskFieldId: field.id });
        }

        if (dto.fieldType === 'string') {
            fieldValue.stringValue = dto.stringValue;
            fieldValue.numericValue = null;
            fieldValue.listValue = null;
        } else if (dto.fieldType === 'number') {
            fieldValue.numericValue = dto.numericValue;
            fieldValue.stringValue = null;
            fieldValue.listValue = null;
        } else if (dto.fieldType === 'list') {
            if (!field.options.includes(dto.listValue)) {
                throw new HttpException('Invalid list value', HttpStatus.BAD_REQUEST);
            }
            fieldValue.listValue = dto.listValue;
            fieldValue.stringValue = null;
            fieldValue.numericValue = null;
        } else {
            throw new HttpException('Unsupported field type', HttpStatus.BAD_REQUEST);
        }

        return await this.taskFieldValueRepository.save(fieldValue);
    }

    async getFieldValue(taskId: number, fieldId: number, userId: number): Promise<TaskFieldValue> {
        const task = await this.tasksService.getOneById(taskId, userId);
        const field = await this.taskFieldsService.getOneById(fieldId, userId);

        const fieldValue = await this.taskFieldValueRepository.findOne({ where: { task, taskField: field } });
        if (!fieldValue) {
            throw new HttpException('Field value not found', HttpStatus.NOT_FOUND);
        }

        return fieldValue;
    }

    async removeFieldValue(taskId: number, fieldId: number, userId: number): Promise<void> {
        const task = await this.tasksService.getOneById(taskId, userId);
        const field = await this.taskFieldsService.getOneById(fieldId, userId);

        await this.taskFieldValueRepository.delete({ task, taskFieldId: field.id });
    }
}