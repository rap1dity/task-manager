import { forwardRef, Module } from "@nestjs/common";
import { TasksController } from './tasks.controller';
import { TaskService } from './tasks.service';
import { UsersModule } from "../users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./entities/tasks.entity";
import { AuthModule } from "../auth/auth.module";
import { TaskListsModule } from "../task-lists/task-lists.module";
import { TaskFieldsValuesModule } from "../task-fields-values/task-fields-values.module";

@Module({
    controllers: [TasksController],
    providers: [TaskService],
    imports: [
        TypeOrmModule.forFeature([Task]),
        UsersModule,
        TaskListsModule,
        AuthModule,
        forwardRef(() => TaskFieldsValuesModule)
    ],
    exports: [
        TaskService
    ]
})
export class TasksModule {}
