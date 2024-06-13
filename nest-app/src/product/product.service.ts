import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma, Product, Size } from "@prisma/client";
import { CreateProductDto } from "./dto/create-product.dto";

type GetProductParams = {
  skip?: number;
  take?: number;
  cursor?: Prisma.ProductWhereUniqueInput;
  where?: Prisma.ProductWhereInput;
  orderBy?: Prisma.ProductOrderByWithRelationInput;
};

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(
    where: Prisma.ProductWhereUniqueInput,
  ): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where,
      include: {
        images: true,
      },
    });
  }

  async getProductSizes(productId: number): Promise<Size[]> {
    const productInventories = await this.prisma.productInventory.findMany({
      where: {
        productId: productId,
        quantity: { gt: 0 }
      },
      select: {
        size: true
      }
    });

    return productInventories.map((inventory) => inventory.size);
  }

  async getAll(params: GetProductParams) {
    const { skip, take } = params;
    return this.prisma.product.findMany({
      skip,
      take,
      include: {
        images: true,
      },
    });
  }

  async createProduct(newProduct: CreateProductDto): Promise<Product> {
    const { name, description, price, images } = newProduct;
    const items = [
      { size: Size.S, quantity: 25 },
      { size: Size.M, quantity: 25 },
      { size: Size.L, quantity: 25 },
      { size: Size.XL, quantity: 25 }
    ];
    return this.prisma.product.create({
      data: {
        name,
        description,
        price,
        images: {
          createMany: {
            data: images.map((image) => ({ imageUrl: image }))
          }
        },
        inventories: {
          createMany: {
            data: items.map((item) => ({ quantity: item.quantity, size: item.size }))
          }
        },
      }
    });
  }

  async updateProduct(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.ProductUpdateInput;
  }): Promise<Product> {
    return this.prisma.product.update(params);
  }

  async deleteProducts() {
    await this.prisma.$transaction(async (prisma) => {
      const products = await prisma.product.findMany();
      for (const product of products) {
        await prisma.image.deleteMany({
          where: { productId: product.id },
        });
      }

      await prisma.product.deleteMany();
    });
  }
}
