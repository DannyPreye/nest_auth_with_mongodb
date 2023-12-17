/* eslint-disable prettier/prettier */
import
{
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Param,
    Body,
    Query,
    NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import CreateProductDTO from './dtos/create_product.dto';
import FilterProductDTO from './dtos/filter_product.dto';

@Controller('product')
export class ProductController
{
    constructor (private productService: ProductService) { }

    @Get('/')
    async getProducts(@Query() filterProductDTO: FilterProductDTO)
    {
        if (Object.keys(filterProductDTO).length) {
            const filterProducts =
                await this.productService.getFilteredProducts(filterProductDTO);
            return filterProducts;
        }

        const allProduct = await this.productService.getAllProducts();
        return allProduct;
    }

    @Get("/:id")
    async getSingleProduct(@Param("id") id: string)
    {
        const product = await this.productService.getProduct(id);
        if (!product) throw new NotFoundException("Product not found");

        return product;
    }

    @Post('/')
    async addProduct(@Body() createProductDTO: CreateProductDTO)
    {
        const product = await this.productService.addProduct(createProductDTO);
        return product;
    }

    @Put('/:id')
    async updateProduct(@Param('id') id: string, @Body() createProductDTO: CreateProductDTO)
    {
        const product = await this.productService.updateProduct(id, createProductDTO);
        if (!product) throw new NotFoundException('Product does not exist!');
        return product;
    }

    @Delete('/:id')
    async deleteProduct(@Param('id') id: string)
    {
        const product = await this.productService.deleteProduct(id);
        if (!product) throw new NotFoundException('Product does not exist');
        return product;
    }
}
