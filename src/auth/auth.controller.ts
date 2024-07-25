import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { Role } from "../roles/entities/roles.entity";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @ApiOperation({summary: 'Login as User'})
    @ApiResponse({status: 200})
    @Post('login')
    login(@Body() dto: CreateUserDto){
        return this.authService.login(dto);
    }

    @ApiOperation({summary: 'Register new User'})
    @ApiResponse({status: 200})
    @Post('register')
    register(@Body() dto: CreateUserDto){
        return this.authService.register(dto);
    }
}
