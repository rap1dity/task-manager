import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../../projects/entities/projects.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../roles/entities/roles.entity";


@Entity({name: 'users'})
export class User {
    @ApiProperty({example: 1, description: 'Unique identifier'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'timeworstseal', description: 'Username'})
    @Column()
    username: string;

    @ApiProperty({example: 'pass123', description: 'Password'})
    @Column()
    password: string;

    @OneToMany(() => Project, project => project.user)
    projects: Project[];

    @ManyToMany(() => Role, role => role.users)
    @JoinTable({
        name: 'user_roles',
        joinColumn: {
            name: 'userId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
          name: 'roleId',
          referencedColumnName: 'id'
        }
    })
    roles: Role[];
}