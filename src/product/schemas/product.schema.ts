/* eslint-disable prettier/prettier */
import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export default class Product
{
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    price: number;

    @Prop()
    category: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
