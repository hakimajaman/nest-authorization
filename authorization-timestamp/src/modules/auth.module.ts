import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { AuthControllers } from 'src/controllers/auth.controllers';
import { AuthServices } from 'src/services/auth.service';
import { BrowserModule } from './browser.module';
import { PrismaModule } from './prisma.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    BrowserModule,
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [AuthControllers],
  providers: [AuthServices],
})
export class AuthModule {}
