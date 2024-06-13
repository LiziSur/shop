import { Body, Controller, Get, Post, Render, Res, UseInterceptors } from "@nestjs/common";
import { ResponseTimeInterceptor } from './interceptor';
import { AppService } from './app.service';

@UseInterceptors(ResponseTimeInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @Render('index')
  root() {
    return;
  }

  @Get('/about')
  @Render(`about`)
  getAboutPage() {
    return;
  }

  @Get('/login')
  @Render(`login`)
  getLoginPage() {
    return;
  }

  @Get('/cart')
  @Render(`cart`)
  getCartPage() {
    return;
  }

  @Get('/contact')
  @Render(`contact`)
  getContactPage() {
    return;
  }

  @Get('/addProduct')
  @Render(`addProduct`)
  getAddProductPage() {
    return;
  }
}