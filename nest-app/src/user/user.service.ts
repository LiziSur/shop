import { PrismaService } from "../prisma/prisma.service";
import { Prisma, Role } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDTO } from "./dto/login-user.dto";
import { InfoUserDto } from "./dto/info-user.dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getById(where: Prisma.UserWhereUniqueInput): Promise<InfoUserDto | null> {
    const user = await this.prisma.user.findUnique({ where });
    return {
      name: user.name,
      secondName: user.secondName,
      email: user.email,
      role: user.role.valueOf(),
    };
  }

  async createUser(newUser: CreateUserDto): Promise<number> {
    const { name, secondName, email, password, birthday} = newUser;
    const user = await this.prisma.user.create({
      data: {
        name,
        secondName,
        email,
        password,
        orders: undefined,
        role: Role.USER
      }
    });
    return user.id.valueOf();
  }

  async loginUser(userData: LoginUserDTO): Promise<number> {
    const { email, password } = userData;
    const user = await this.prisma.user.findUnique({
      where: {
        email: email
      }
    });
    if (!user) {
      throw new Error('User not found');
    }
    const passwordMatches = password == user.password;
    if (!passwordMatches) {
      throw new Error('Incorrect password');
    }
    return user.id.valueOf();
  }
}