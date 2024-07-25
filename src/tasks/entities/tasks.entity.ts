import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskList } from "../../task-lists/entities/task-lists.entity";
import { ApiProperty } from "@nestjs/swagger";
import { TaskField } from "../../task-fields/entities/task-fields.entity";
import { TaskFieldValue } from "../../task-fields-values/entities/task-fields-values.entity";

@Entity({ name: 'tasks' })
export class Task {
  @ApiProperty({example: 1, description: 'Unique identifier'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Tech support report #143', description: 'Username'})
  @Column()
  title: string;

  @ApiProperty({example: 'Fix transparent background', description: 'Username'})
  @Column()
  description: string;

  @ApiProperty({example: 13, description: 'Username'})
  @Column()
  order: number;

  @ApiProperty({example: '18.05.2022', description: 'Date of creation'})
  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => TaskList, taskList => taskList.tasks)
  taskList: TaskList;

  @OneToMany(() => TaskFieldValue, taskFieldValue => taskFieldValue.task, { cascade: true })
  fieldValues: TaskFieldValue[];
}