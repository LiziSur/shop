import { Body, Controller, Delete, Get, Param, Post, Render } from "@nestjs/common";
import { OrderService } from './order.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from '@prisma/client';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Render Order Form' })
  @ApiResponse({ status: 200, description: 'Page rendered' })
  @Get('/orderForm')
  @Render('orderForm.hbs')
  async getOrderForm() {
    return;
  }

  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Page rendered' })
  @Get('/all/:userId')
  @Render('orderList.hbs')
  async getOrders(@Param('userId') userId: string) {
    const userIdNumber = parseInt(userId, 10);
    const viewData = await this.orderService.getAll({userId: userIdNumber});
    const length = viewData.length
    return { viewData, length };
  }

  @ApiOperation({ summary: 'Add new Order' })
  @ApiResponse({ status: 200, description: 'Order is added' })
  @Post('/new')
  async addOrder(@Body() newOrder: CreateOrderDto) {
    await this.orderService.createOrder(newOrder);
  }

  // @ApiOperation({ summary: 'Get order by id' })
  // @ApiResponse({ status: 200, description: 'Page rendered' })
  // @Get(':id')
  // @Render('order.hbs')
  // async getOrder(@Param('id') id: string) {
  //   const order = await this.orderService.getById({
  //     id: Number(id),
  //   });
  //   return { order };
  // }
}
