import { ForbiddenException, forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "./entities/tasks.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskListsService } from "../task-lists/task-lists.service";
import { TaskFieldValuesService } from "../task-fields-values/task-fields-values.service";

@Injectable()
export class TaskService {
    constructor(@InjectRepository(Task)
                private readonly taskRepository: Repository<Task>,
                @Inject(forwardRef(() => TaskFieldValuesService))
                private readonly taskFieldValuesService: TaskFieldValuesService,
                private readonly taskListService: TaskListsService) {}

    async create(dto: CreateTaskDto, userId: number){
        const parent = await this.taskListService.getOneById(dto.taskListId, userId);
        const { fieldValues, ...createDto } = dto

        const candidate = this.taskRepository.create({...createDto, taskList: parent });
        for(const tl of parent.tasks){
            if(tl.order >= dto.order)
                tl.order +=1;
        }
        await this.taskRepository.save(parent.tasks);
        const task = await this.taskRepository.save(candidate);

        if (fieldValues && fieldValues.length > 0) {
            for (const fieldValue of fieldValues) {
                await this.taskFieldValuesService.setFieldValue(parent.id, fieldValue, userId);
            }
        }

        return task;
    }

    async getOneById(taskId: number, userId: number){
        const task = await this.taskRepository.findOne({ where: { id: taskId }, relations: ['taskList.project', 'taskList.project', 'taskList.project.user', 'fieldValues'] });
        if(!task)
            throw new HttpException('Task is not found', HttpStatus.BAD_REQUEST);
        else if(task.taskList.project.user.id !== userId)
            throw new ForbiddenException('Access to this task is forbidden');

        return task;
    }

    async update(id: number, dto: CreateTaskDto, userId: number){
        const task = await this.taskRepository.findOne({ where: { id }, relations: ['taskList', 'taskList.tasks', 'taskList.project', 'taskList.project.user'] });

        if(!task)
            throw new HttpException('Task is not found', HttpStatus.BAD_REQUEST);
        else if(task.taskList.project.user.id !== userId)
            throw new ForbiddenException('Access to this task is forbidden');

        const taskList = task.taskList;
        const targetOrder = task.order;
        const newOrder = dto.order;

        if(dto.taskListId !== task.taskList.id){
            const newTaskList = await this.taskListService.getOneById(dto.taskListId, userId);
            for(const task of newTaskList.tasks){
                if(task.order >= newOrder)
                    task.order += 1;
            }
            for(const task of taskList.tasks){
                if(task.order > targetOrder)
                    task.order -= 1;
            }
            await this.taskRepository.save(taskList.tasks);
            const { taskListId, ...taskDto } = dto;
            await this.taskRepository.save(newTaskList.tasks)
            return await this.taskRepository.update(task.id, { ...taskDto, taskList: newTaskList});
        }
        else{
            for(const task of taskList.tasks){
                if(task.order < newOrder && task.order > targetOrder)
                    task.order -=1;
                else if(task.order >= newOrder && task.order < targetOrder)
                    task.order += 1;
            }

            await this.taskRepository.save(taskList.tasks);
            const { taskListId, ...taskDto } = dto;
            return await this.taskRepository.update(task.id, taskDto);
        }
    }

    async delete(id: number, userId: number){
        const task = await this.taskRepository.findOne({ where: { id }, relations: ['taskList', 'taskList.project', 'taskList.project.user'] });

        if(!task)
            throw new HttpException('Task is not found', HttpStatus.BAD_REQUEST);
        else if(task.taskList.project.user.id !== userId)
            throw new ForbiddenException('Access to this task is forbidden');

        const taskList = task.taskList;
        const targetOrder = task.order;

        for(const task of taskList.tasks){
            if(task.order > targetOrder)
                task.order -= 1;
        }
        await this.taskRepository.save(taskList.tasks);

        return await this.taskRepository.delete(id);
    }
}
