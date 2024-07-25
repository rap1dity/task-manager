import { ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "./entities/projects.entity";
import { Repository } from "typeorm";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UsersService } from "../users/users.service";
import { User } from "../users/entities/users.entity";

@Injectable()
export class ProjectsService {
    constructor(@InjectRepository(Project)
                private readonly projectsRepository: Repository<Project>,
                private readonly userService: UsersService,
    ) {}
    async create(dto: CreateProjectDto, id: number){
        const candidate = await this.userService.getOneById(id);
        if(!candidate)
            throw new HttpException('User is not found', HttpStatus.BAD_REQUEST);
        const project = this.projectsRepository.create({...dto, user: candidate})
        return await this.projectsRepository.save(project);
    }

    async getAll(id: number){
        const candidate = await this.userService.getOneById(id);
        if(!candidate)
            throw new HttpException('User is not found', HttpStatus.BAD_REQUEST);
        return await this.projectsRepository.find({where: { user: candidate }});
    }

    async getOneById(id: number, userId: number){
        const project = await this.projectsRepository.findOne({ where: { id }, relations: ['user', 'taskLists', 'taskFields']})
        if(!project)
            throw new HttpException('Project is not found', HttpStatus.BAD_REQUEST);
        else if(project.user.id !== userId)
            throw new ForbiddenException('Access to this project is forbidden');
        return project;
    }

    async update(postId: number, dto: CreateProjectDto, userId: number){
        const project = await this.projectsRepository.findOne({ where: { id: postId } });
        if(!project || project.user.id != userId)
            throw new HttpException('Post is not found', HttpStatus.BAD_REQUEST);
        return this.projectsRepository.update(postId, dto)
    }

    async delete(id: number, userId: number) {
        const candidate = await this.userService.getOneById(id);
        if(!candidate)
            throw new HttpException('User is not found', HttpStatus.BAD_REQUEST);
        return await this.projectsRepository.delete({id, user: candidate});
    }
}
