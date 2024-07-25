import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/entities/users.entity";

@Entity({ name: 'roles' })
export class Role {
    @ApiProperty({example: 1, description: 'Unique identifier'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'admin', description: 'Unique user role'})
    @Column({unique: true})
    value: string;

    @ApiProperty({example: 'all rights', description: 'Role description'})
    @Column()
    description: string;

    @ManyToMany(() => User, user => user.roles)
    users: User[];
}