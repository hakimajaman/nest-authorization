import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserServices {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput) {
    const findExist = await this.getUserByEmail(data.email);
    if (findExist) {
      throw 'Email already exist';
    }

    const creatingUser = await this.prisma.user.create({
      data,
    });

    return creatingUser;
  }

  async getUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }
}
