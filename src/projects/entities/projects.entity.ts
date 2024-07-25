import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/users.entity";
import { TaskList } from "../../task-lists/entities/task-lists.entity";
import { ApiProperty } from "@nestjs/swagger";
import { TaskField } from "../../task-fields/entities/task-fields.entity";

@Entity({name: 'projects'})
export class Project {
  @ApiProperty({example: 1, description: 'Unique identifier'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'trello', description: 'Project title'})
  @Column()
  title: string;

  @ApiProperty({example: 'some info', description: 'Project description'})
  @Column()
  description: string;

  @ApiProperty({example: '18.05.2022', description: 'Date of creation'})
  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => User, user => user.projects)
  user: User;

  @OneToMany(() => TaskList, taskList => taskList.project, { cascade: true})
  taskLists: TaskList[];

  @OneToMany(() => TaskField, taskField => taskField.project, { cascade: true })
  taskFields: TaskField[];
}