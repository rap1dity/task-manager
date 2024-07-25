import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskList } from "../../task-lists/entities/task-lists.entity";
import { Project } from "../../projects/entities/projects.entity";
import { TaskFieldValue } from "../../task-fields-values/entities/task-fields-values.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'task_fields' })
export class TaskField {
    @ApiProperty({example: 1, description: 'Identifier of task field'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'Priority', description: 'Title of task field'})
    @Column()
    title: string;

    @ApiProperty({example: 'list', description: 'Task field type'})
    @Column()
    type: 'string' | 'number' | 'list';

    @ApiProperty({example: ['low','medium','high'], description: 'Task field available options if type is list'})
    @Column('simple-array', { nullable: true })
    options: string[];

    @ManyToOne(() => Project, project => project.taskFields, { onDelete: 'CASCADE' })
    project: Project;

    @OneToMany(() => TaskFieldValue, taskFieldValue => taskFieldValue.taskField)
    fieldValues: TaskFieldValue[];
}