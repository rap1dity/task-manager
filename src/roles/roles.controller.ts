import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { RolesService } from "./roles.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Role } from "./entities/roles.entity";

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @ApiOperation({summary: 'Create a new role'})
    @ApiResponse({status: 200, type: Role})
    @Post()
    create(@Body() dto: CreateRoleDto){
        return this.rolesService.create(dto);
    }

    @ApiOperation({summary: 'Find existing role'})
    @ApiResponse({status: 200, type: Role})
    @Get(':value')
    get(@Param('value') value: string) {
        return this.rolesService.get(value);
    }

}
