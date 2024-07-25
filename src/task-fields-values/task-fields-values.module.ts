import { forwardRef, Module } from "@nestjs/common";
import { TaskFieldsValuesController } from './task-fields-values.controller';
import { TaskFieldValuesService } from "./task-fields-values.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../users/users.module";
import { AuthModule } from "../auth/auth.module";
import { TaskFieldValue } from "./entities/task-fields-values.entity";
import { TasksModule } from "../tasks/tasks.module";
import { TaskFieldsModule } from "../task-fields/task-fields.module";

@Module({
    controllers: [TaskFieldsValuesController],
    providers: [TaskFieldValuesService],
    imports: [
        TypeOrmModule.forFeature([TaskFieldValue]),
        UsersModule,
        AuthModule,
        TaskFieldsModule,
        forwardRef(() => TasksModule),
    ],
    exports: [
        TaskFieldValuesService
    ]
})
export class TaskFieldsValuesModule {}
