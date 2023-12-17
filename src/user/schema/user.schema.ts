/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/auth/enum/role.enum';

export type UserDocument = User & Document;

@Schema()
export default class User
{
    @Prop({
        required: true,
    })
    first_name: string;

    @Prop({
        required: true,
    })
    last_name: string;

    @Prop({
        unique: true,
        required: true,
    })
    email: string;

    @Prop()
    password: string;

    @Prop()
    role: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
