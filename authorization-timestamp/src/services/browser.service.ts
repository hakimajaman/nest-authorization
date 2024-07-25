import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class BrowserServices {
  constructor(private prisma: PrismaService) {}

  async createBrowser(
    userId: number,
    data: Prisma.BrowserCreateWithoutUsersInput,
  ) {
    const creatingBrowser = await this.prisma.browser.create({
      data: {
        ...data,
        users: {
          create: [{ userId }],
        },
      },
    });

    return creatingBrowser;
  }

  async getBrowserByDetails(
    browserId: number,
    browserName: string,
    browserOS: string,
  ) {
    const browser = await this.prisma.browser.findUnique({
      where: {
        id: browserId,
        AND: {
          name: browserName,
          AND: {
            os: browserOS,
          },
        },
      },
      include: {
        users: {
          select: {
            userId: true,
          },
        },
      },
    });

    return browser;
  }

  async getBrowserById(id: number) {
    const browser = await this.prisma.browser.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            userId: true,
          },
        },
      },
    });

    return browser;
  }

  async addUserOnBrowser(browserId: number, userId: number) {
    await this.prisma.userOnBrowsers.create({
      data: {
        browserId,
        userId,
      },
    });

    const browser = await this.getBrowserById(browserId);
    return browser;
  }

  async getUserOnBrowser(browserId: number, userId: number) {
    const userAndBrowser = await this.prisma.userOnBrowsers.findUnique({
      where: {
        userId_browserId: {
          userId,
          browserId,
        },
      },
    });

    return userAndBrowser;
  }
}
