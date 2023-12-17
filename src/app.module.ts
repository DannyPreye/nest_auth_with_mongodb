/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import {} from "@nestjs/cli"

import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI, { dbName: "ecommerce_nest" }),

    ProductModule,

    UserModule,

    AuthModule,
  ],
  controllers: [ AppController, ],
  providers: [ AppService, ],
})
export class AppModule { }
