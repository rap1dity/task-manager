import { Entity, ManyToOne, JoinColumn, PrimaryColumn, Column } from 'typeorm';
import { TaskField } from "../../task-fields/entities/task-fields.entity";
import { Task } from "../../tasks/entities/tasks.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class TaskFieldValue {
    @ApiProperty({example: 1, description: 'Identifier of task field'})
    @PrimaryColumn()
    taskFieldId: number;

    @ApiProperty({example: 2, description: 'Identifier of task'})
    @PrimaryColumn()
    taskId: number;

    @ApiProperty({example: 'task title', description: 'string field value'})
    @Column('text', { nullable: true })
    stringValue: string | null;

    @ApiProperty({example: 24, description: 'number field value'})
    @Column('double precision', { nullable: true })
    numericValue: number | null;

    @ApiProperty({example: 'high', description: 'list field value'})
    @Column('text', { nullable: true })
    listValue: string | null;

    @ManyToOne(() => TaskField, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'taskFieldId' })
    taskField: TaskField;

    @ManyToOne(() => Task, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'taskId' })
    task: Task;
}
