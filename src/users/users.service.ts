import { Body, HttpException, HttpStatus, Injectable, NotFoundException, Param, ParseIntPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/users.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "../roles/roles.service";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>,
      private roleService: RolesService) {}

    async create(dto: CreateUserDto) {
        const user = this.usersRepository.create(dto);
        const role = await this.roleService.get('user');
        user.roles = [role];
        return await this.usersRepository.save(user);
    }

    async getOneById(id: number){
        const user = await this.usersRepository.findOne({ where: { id } });
        if(!user)
            throw new HttpException('User is not found', HttpStatus.BAD_REQUEST);
        return user;
    }

    async getOneByUsername(username: string){
        return await this.usersRepository.findOne({ where: { username }, relations: ['roles']});
    }

    async update(id: number, dto: CreateUserDto) {
        const candidate = await this.usersRepository.findOne( {where : {id} })
        if(!candidate)
            throw new HttpException(`User with id ${id} not found`, HttpStatus.BAD_REQUEST);
        const hashPassword = await bcrypt.hash(dto.password, 5);
        return await this.usersRepository.update(id, {...dto, password: hashPassword});
    }

    async delete(id: number) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if(!user)
            throw new NotFoundException(`User with id ${id} not found`);
        return await this.usersRepository.delete(id);
    }
}
