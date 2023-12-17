/* eslint-disable prettier/prettier */
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bycrypt from 'bcrypt';

@Injectable()
export class AuthService
{
    constructor (private readonly userService: UserService, private readonly jwtService: JwtService) { }

    async validateUser(email: string, password: string)
    {
        const user = await this.userService.findUser(email);
        const isPasswordMatch = await bycrypt.compare(password, user.password);
        if (user && isPasswordMatch) {
            return user;
        }
        return null;
    }

    async login(user: any)
    {
        const payload = { email: user.email, sub: user._id, role: user.role };

        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
