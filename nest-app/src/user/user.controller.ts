import { Body, Controller, Delete, Get, Param, Post, Render, Res } from "@nestjs/common";
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDTO } from "./dto/login-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Render Profile' })
  @ApiResponse({ status: 200, description: 'Page rendered' })
  @Get('/profile/:userId')
  @Render('profile.hbs')
  async getProfile(@Param('userId') userId: string) {
    const viewData = await this.userService.getById({
      id: Number(userId),
    });
    return { viewData };
  }

  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({ status: 200, description: 'Signed up' })
  @Post('/signUp')
  async signUp(@Body() userData: CreateUserDto): Promise<{ userId: Number }> {
    const userId = await this.userService.createUser(userData);
    // const hashedId = await bcrypt.hash(userId.toString(), 10);
    return { userId };
  }

  @ApiOperation({ summary: 'Log in' })
  @ApiResponse({ status: 200, description: 'Logged in' })
  @Post('/login')
  async login(@Body() userData: LoginUserDTO): Promise<{ userId: number }> {
    const userId = await this.userService.loginUser(userData);
    // const hashedId = await bcrypt.hash(userId.toString(), 10);
    return { userId };
  }
}
