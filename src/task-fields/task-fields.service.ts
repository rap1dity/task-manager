import { ForbiddenException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskField } from "./entities/task-fields.entity";
import { Repository } from "typeorm";
import { Project } from "../projects/entities/projects.entity";
import { CreateTaskFieldDto } from "./dto/create-task-field.dto";
import { ProjectsService } from "../projects/projects.service";

@Injectable()
export class TaskFieldsService {
    constructor(@InjectRepository(TaskField)
                private readonly taskFieldRepository: Repository<TaskField>,
                private readonly projectService: ProjectsService) {}

    async create(dto: CreateTaskFieldDto, userId: number){
        const project = await this.projectService.getOneById(dto.projectId, userId);

        const taskField = this.taskFieldRepository.create({ ...dto, project});
        return this.taskFieldRepository.save(taskField);
    }

    async getAll(projectId: number, userId: number){
        const project = await this.projectService.getOneById(projectId, userId);

        return project.taskFields;
    }

    async getOneById(id: number, userId: number){
        const taskField = await this.taskFieldRepository.findOne({ where: {id} , relations: ['project', 'project.user']})

        if(!taskField)
            throw new HttpException(`Task field with ID ${id} not found`, HttpStatus.BAD_REQUEST);
        else if(taskField.project.user.id !== userId)
            throw new ForbiddenException('Access to this task list is forbidden');

        return taskField;
    }

    async update(id: number, dto: CreateTaskFieldDto, userId: number){
        const taskField = await this.taskFieldRepository.findOne({ where: {id} , relations: ['project', 'project.user']})

        if(!taskField)
            throw new HttpException(`Task field with ID ${id} not found`, HttpStatus.BAD_REQUEST);
        else if(taskField.project.user.id !== userId)
            throw new ForbiddenException('Access to this task list is forbidden');

        await this.taskFieldRepository.update(id, dto);
        return this.taskFieldRepository.save(taskField);
    }

    async remove(id: number, userId: number){
        const taskField = await this.taskFieldRepository.findOne({ where: { id } , relations: ['project', 'project.user'] });

        if(!taskField)
            throw new HttpException(`Task field with ID ${id} not found`, HttpStatus.BAD_REQUEST);
        else if(taskField.project.user.id !== userId)
            throw new ForbiddenException('Access to this task list is forbidden');

        await this.taskFieldRepository.delete(id);
    }

}
