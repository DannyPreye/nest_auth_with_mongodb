/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import Product, { ProductDocument } from './schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import FilterProductDTO from './dtos/filter_product.dto';
import CreateProductDTO from './dtos/create_product.dto';

@Injectable()
export class ProductService
{
    constructor (
        @InjectModel('Product')
        private readonly prodcutModel: Model<ProductDocument>,
    ) { }

    async getFilteredProducts(filterProductDTO: FilterProductDTO): Promise<Product[]>
    {
        const { category, search } = filterProductDTO;

        let products = await this.getAllProducts();

        if (search) {
            products = products.filter((product: { name: string | string[]; description: string | string[]; }) => (
                product.name.includes(search) || product.description.includes(search)
            ));
        }

        if (category) {
            products = products.filter(product => product.category === category);
        }

        return products;
    }

    async getAllProducts(): Promise<Product[]>
    {

        const products = this.prodcutModel.find().exec();

        return products;
    }

    async getProduct(id: string): Promise<Product>
    {
        const product = this.prodcutModel.findById(id).exec();

        return product;
    }

    async addProduct(CreateProductDTO: CreateProductDTO): Promise<Product>
    {
        const newProduct = await this.prodcutModel.create(CreateProductDTO);
        return newProduct.save();
    }

    async updateProduct(id: string, createProductDTO: CreateProductDTO): Promise<Product>
    {
        const updatedProduct = await this.prodcutModel.findByIdAndUpdate(id, createProductDTO, { new: true });

        return updatedProduct;
    }

    async deleteProduct(id: string): Promise<any>
    {
        const deletedProduct = await this.prodcutModel.findByIdAndDelete(id);

        return deletedProduct;

    }
}
