import { Module } from '@nestjs/common';
import { TaskListsController } from './task-lists.controller';
import { TaskListsService } from './task-lists.service';
import { ProjectsModule } from "../projects/projects.module";
import { UsersModule } from "../users/users.module";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskList } from "./entities/task-lists.entity";

@Module({
      controllers: [TaskListsController],
      providers: [TaskListsService],
      imports: [
          TypeOrmModule.forFeature([TaskList]),
          ProjectsModule,
          UsersModule,
          AuthModule
      ],
      exports: [
          TaskListsService,
      ]
})
export class TaskListsModule {}
