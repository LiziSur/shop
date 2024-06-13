import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Order, Status } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';

type GetOrderParams = {
  userId?: number;
};

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(newOrder: CreateOrderDto): Promise<Order> {
    const { userId, products, ...orderData } = newOrder;
    // const originalUserId = await this.decodeUserId(userId);
    const productIds = products.map((productId) => ({ id: productId }));
    return this.prisma.order.create({
      data: {
        ...orderData,
        status: Status.WAITING_FOR_DISPATCH,
        userId: userId,
        products: {
          connect: productIds,
        },
      },
    });
  }

  async getById(where: Prisma.OrderWhereUniqueInput): Promise<Order | null> {
    return this.prisma.order.findUnique({ where });
  }

  async getAll(params: GetOrderParams) {
    const { userId } = params;
    return this.prisma.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        products: {
          include: {
            images: true
          }
        }
      },
    });
  }

  async deleteOrders() {
    await this.prisma.$transaction(async (prisma) => {
      await prisma.order.deleteMany();
    });
  }
}
