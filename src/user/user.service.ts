/* eslint-disable prettier/prettier */
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import User, { UserDocument } from './schema/user.schema';
import CreateUserDTO from './dtos/CreateUser.dto';
import * as bycrypt from "bcrypt";

@Injectable()
export class UserService
{
    constructor (
        @InjectModel('User') private readonly UserModel: Model<UserDocument>,
    ) { }

    async addUser(createUserDto: CreateUserDTO): Promise<User | undefined>
    {
        const newUser = await this.UserModel.create(createUserDto);
        newUser.password = await bycrypt.hash(newUser.password, 10);

        return newUser.save();
    }

    async findUser(email: string): Promise<User | undefined>
    {
        const user = await this.UserModel.findOne({ email });
        return user;
    }
}
