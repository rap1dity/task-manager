import { ForbiddenException, HttpException, HttpStatus, Injectable, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskList } from "./entities/task-lists.entity";
import { CreateTaskListDto } from "./dto/create-task-list.dto";
import { Repository } from "typeorm";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ProjectsService } from "../projects/projects.service";
import { UpdateTaskListDto } from "./dto/update-task-list.dto";

@UseGuards(JwtAuthGuard)
@Injectable()
export class TaskListsService {
    constructor(@InjectRepository(TaskList)
                private readonly taskListRepository: Repository<TaskList>,
                private readonly projectService: ProjectsService) {}

    async create(dto: CreateTaskListDto, userId: number){
        const parent = await this.projectService.getOneById(dto.projectId, userId);

        const candidate = this.taskListRepository.create({...dto, project: parent});
        for(const tl of parent.taskLists) {
            if(tl.order >= dto.order)
                tl.order += 1;
        }
        await this.taskListRepository.save(parent.taskLists);
        const { project, ...taskList } = await this.taskListRepository.save(candidate);
        
        return taskList as TaskList;
    }

    async getOneById(taskListId: number, userId: number){
        const taskList = await this.taskListRepository.findOne({ where: { id: taskListId }, relations: ['tasks','project', 'project.user'] })

        if(!taskList)
            throw new HttpException('TaskList is not found', HttpStatus.BAD_REQUEST);
        else if(taskList.project.user.id !== userId)
            throw new ForbiddenException('Access to this task list is forbidden');

        return taskList;
    }

    async update(id: number, dto: UpdateTaskListDto, userId: number){
        const taskList = await this.taskListRepository.findOne({ where: { id }, relations: ['project', 'project.user', 'project.taskLists'] });

        if(!taskList)
            throw new HttpException('TaskList is not found', HttpStatus.BAD_REQUEST);
        else if(taskList.project.user.id !== userId)
            throw new ForbiddenException('Access to this task list is forbidden');

        const project = taskList.project;
        const targetOrder = taskList.order;
        const newOrder = dto.order;

        for(const tl of project.taskLists) {
            if(tl.order <= newOrder && tl.order > targetOrder)
                tl.order -= 1;
            else if(tl.order >= newOrder && tl.order < targetOrder)
                tl.order += 1;
        }
        await this.taskListRepository.save(project.taskLists);
        return await this.taskListRepository.update(taskList.id, dto);
    }

    async delete(id: number, userId: number){
        const taskList = await this.taskListRepository.findOne({ where: { id: id } });

        if(!taskList)
            throw new HttpException('TaskList is not found', HttpStatus.BAD_REQUEST);
        else if(taskList.project.user.id !== userId)
            throw new ForbiddenException('Access to this task list is forbidden');

        const project = taskList.project;
        const targetOrder = taskList.order;

          for(const tl of project.taskLists) {
              if(tl.order > targetOrder)
                  tl.order -= 1;
          }
          await this.taskListRepository.save(project.taskLists);

        return await this.taskListRepository.delete(id);
    }
}
