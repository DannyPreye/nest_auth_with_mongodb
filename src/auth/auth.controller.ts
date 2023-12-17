/* eslint-disable prettier/prettier */
import
{
    Controller,
    Get,
    Post,
    Body,
    Request,
    UseGuards,
} from '@nestjs/common';
import CreateUserDTO from 'src/user/dtos/CreateUser.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import LocalAuthGuard from './guards/local.guard';
import JWTAuthGuard from './guards/jwt.guard';
import { Roles } from './enum/role.decorator';
import { Role } from './enum/role.enum';
import RoleGuard from './guards/role.guard';

@Controller('auth')
export class AuthController
{
    constructor (
        private authService: AuthService,
        private userService: UserService,
    ) { }

    @Post('/register')
    async register(@Body() createUserDto: CreateUserDTO)
    {
        const user = await this.userService.addUser(createUserDto);
        return user;
    }

    @UseGuards(LocalAuthGuard)
    @Post("/login")
    async login(@Request() req)
    {
        return this.authService.login(req.user);
    }


    @UseGuards(JWTAuthGuard, RoleGuard)
    @Roles(Role.user)
    @Get("/user")
    async getProfile(@Request() req)
    {
        return req.user;
    }

    @UseGuards(JWTAuthGuard, RoleGuard)
    @Roles(Role.Admin)
    @Get("/user")
    getDashboard(@Request() req)
    {
        return req.user;

    }



}
