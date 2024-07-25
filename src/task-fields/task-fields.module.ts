import { Module } from '@nestjs/common';
import { TaskFieldsController } from './task-fields.controller';
import { TaskFieldsService } from './task-fields.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskField } from "./entities/task-fields.entity";
import { UsersModule } from "../users/users.module";
import { AuthModule } from "../auth/auth.module";
import { ProjectsModule } from "../projects/projects.module";

@Module({
  controllers: [TaskFieldsController],
  providers: [TaskFieldsService],
  imports: [
      TypeOrmModule.forFeature([TaskField]),
      UsersModule,
      AuthModule,
      ProjectsModule
  ],
    exports: [
        TaskFieldsService
    ]
})
export class TaskFieldsModule {}
