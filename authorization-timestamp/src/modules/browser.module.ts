import { Module } from '@nestjs/common';
import { BrowserServices } from 'src/services/browser.service';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [BrowserServices],
  exports: [BrowserServices],
})
export class BrowserModule {}
