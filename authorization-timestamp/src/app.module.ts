import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth.module';
import { BrowserModule } from './modules/browser.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [UserModule, AuthModule, BrowserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
