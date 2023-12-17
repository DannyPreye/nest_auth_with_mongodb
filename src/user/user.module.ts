/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';

@Module({
  imports: [ MongooseModule.forFeature([ { name: 'User', schema: UserSchema } ]) ],
  providers: [ UserService ],
})
export class UserModule { }
