import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ProjectsService } from "./projects.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { User } from "../users/user.decorator";
import { User as UserEntity } from "../users/entities/users.entity"
import { Project } from "./entities/projects.entity";

@ApiTags('Projects')
@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @ApiOperation({summary: 'Project creation'})
    @ApiResponse({status: 200, type: Project})
    @Post()
    create(@Body() dto: CreateProjectDto,
           @User() user: UserEntity)
    {
        return this.projectsService.create(dto, user.id);
    }

    @ApiOperation({summary: 'Get all User projects'})
    @ApiResponse({status: 200, type: Project})
    @Get()
    getAll(@User() user: UserEntity){
        return this.projectsService.getAll(user.id);
    }

    @ApiOperation({summary: 'Get User project by id'})
    @ApiResponse({status: 200, type: Project})
    @Get(':id')
    getOneById(@Param('id', ParseIntPipe) id: number,
               @User() user: UserEntity){
        return this.projectsService.getOneById(id, user.id);
    }

    @ApiOperation({summary: 'Update existing User project'})
    @ApiResponse({status: 200, type: Project})
    @Put()
    update(@Body() dto: CreateProjectDto,
           @User() user: UserEntity,
           @Param('id', ParseIntPipe) id: number,){
        return this .projectsService.update(id, dto, user.id);
    }

    @ApiOperation({summary: 'Delete existing User Project'})
    @ApiResponse({status: 200})
    @Delete()
    delete(@Param('id', ParseIntPipe) id: number,
           @User() user: UserEntity){
        return this.projectsService.delete(id, user.id);
    }
}
