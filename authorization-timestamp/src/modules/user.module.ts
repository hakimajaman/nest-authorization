import { Module } from '@nestjs/common';
import { UserControllers } from 'src/controllers/user.controllers';
import { UserServices } from 'src/services/user.service';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserControllers],
  providers: [UserServices],
  exports: [UserServices],
})
export class UserModule {}
