import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { CreateAuthDto } from 'src/dtos/auth/CreateAuth.dto';
import { matching } from 'src/utils/hashing';
import { PrismaService } from './prisma.service';
import { UserServices } from './user.service';

@Injectable()
export class AuthServices {
  constructor(
    private prisma: PrismaService,
    private userServices: UserServices,
    private jwtServices: JwtService,
  ) {}

  async loginUser(email: string, password: string) {
    const findUser = await this.userServices.getUserByEmail(email);
    if (!findUser) {
      throw 'Invalid email or password';
    }

    const isMatching = await matching(password, findUser.password);
    if (!isMatching) {
      throw 'Invalid email or password';
    }

    const token = await this.generateToken(findUser.id, email);
    return token;
  }

  async generateToken(id: number, email: string) {
    if (!id || !email) {
      throw 'Id and Email required!';
    }

    const token = await this.jwtServices.signAsync({ id, email });
    return token;
  }

  async decodeToken(token: string) {
    if (!token) {
      throw 'Token required!';
    }

    const decoded = await this.jwtServices.decode(token);
    return decoded;
  }

  async createAuthLog(
    userId: number,
    browserId: number,
    encryptedToken: string,
    expiredAt?: string,
  ) {
    if (!encryptedToken || !browserId || !userId) {
      throw 'Token, UserId and BrowserId required!';
    }

    const creatingAuthLog = await this.prisma.authLog.create({
      data: {
        token: encryptedToken,
        browserId,
        userId,
        expiredAt,
      },
    });

    return creatingAuthLog;
  }

  async getAuthLogByDetails(id: number, userId: number) {
    const authLog = await this.prisma.authLog.findUnique({
      where: {
        id,
        AND: {
          userId,
        },
      },
    });

    return authLog;
  }
}
