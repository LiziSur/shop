import {
  Get,
  Param,
  Controller,
  Render,
  Post,
  Body,
  Delete, Req
} from "@nestjs/common";
import { ProductService } from './product.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Page rendered' })
  @Get('page/:page')
  @Render('store.hbs')
  async getProducts(@Param('page') page: string) {
    const currentPage = Number(page) || 1;
    const pageSize = 16;
    const viewData = await this.productService.getAll({
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    });
    return { viewData };
  }

  @ApiOperation({ summary: 'Add new Product' })
  @ApiResponse({ status: 200, description: 'Product is added' })
  @Post('/add')
  async addProduct(@Body() newProduct: CreateProductDto) {
    await this.productService.createProduct(newProduct);
  }

  @ApiOperation({ summary: 'Get Product by Id' })
  @ApiResponse({ status: 200, description: 'Page rendered' })
  @Get(':id')
  @Render('item.hbs')
  async getProduct(@Param('id') id: string) {
    const viewData = await this.productService.getById({
      id: Number(id),
    });
    const sizes = await this.productService.getProductSizes(Number(id))
    return { viewData, sizes };
  }

  @ApiOperation({ summary: 'Delete all products' })
  @ApiResponse({ status: 200, description: 'Products are deleted' })
  @Delete('/delete')
  async deleteAllProducts() {
    await this.productService.deleteProducts();
  }
}
