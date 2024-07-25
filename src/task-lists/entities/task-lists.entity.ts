import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../../projects/entities/projects.entity";
import { Task } from "../../tasks/entities/tasks.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'task-lists'})
export class TaskList {
  @ApiProperty({example: 1, description: 'Unique identifier'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'To do', description: 'Title of TaskList'})
  @Column()
  title: string;

  @ApiProperty({example: 1, description: 'TaskList order in project'})
  @Column()
  order: number;

  @ManyToOne(() => Project, project => project.taskLists)
  project: Project;

  @OneToMany(() => Task, task => task.taskList, { cascade: true})
  tasks: Task[];
}