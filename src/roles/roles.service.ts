import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "./entities/roles.entity";
import { Repository } from "typeorm";
import { CreateRoleDto } from "./dto/create-role.dto";

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private readonly rolesRepository: Repository<Role>) {}

    async create(dto: CreateRoleDto){
        const newRole= this.rolesRepository.create(dto);
        return this.rolesRepository.save(newRole);
    }

    async get(value: string){
        const role = await this.rolesRepository.findOne({where: { value: value} });
        if(!role)
            throw new NotFoundException(`Role with name ${value} not found`);
        return role;
    }
}
