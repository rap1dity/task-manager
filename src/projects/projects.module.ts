import { Module } from '@nestjs/common';
import { ProjectsController } from "./projects.controller";
import { ProjectsService } from "./projects.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "./entities/projects.entity";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";

@Module({
      controllers: [ProjectsController],
      providers: [ProjectsService],
      imports: [
          TypeOrmModule.forFeature([Project]),
          AuthModule,
          UsersModule
      ],
      exports: [
          ProjectsService,
      ]
})
export class ProjectsModule {}
