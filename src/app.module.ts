import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { User } from "./users/entities/users.entity";
import { Project } from "./projects/entities/projects.entity";
import { TaskList } from "./task-lists/entities/task-lists.entity";
import { Task } from "./tasks/entities/tasks.entity";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/entities/roles.entity";
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { TaskListsModule } from './task-lists/task-lists.module';
import { TaskFieldsModule } from './task-fields/task-fields.module';
import { TaskFieldsValuesModule } from './task-fields-values/task-fields-values.module';
import { TaskField } from "./task-fields/entities/task-fields.entity";
import { TaskFieldValue } from "./task-fields-values/entities/task-fields-values.entity";
import { TaskFieldValuesService } from "./task-fields-values/task-fields-values.service";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
          envFilePath: '.env'
        }),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          entities: [User, Project, TaskList, Task, Role, TaskField, TaskFieldValue],
          autoLoadEntities: true,
          synchronize: true,
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        ProjectsModule,
        TasksModule,
        TaskListsModule,
        TaskFieldsModule,
        TaskFieldsValuesModule
    ]
})
export class AppModule {}