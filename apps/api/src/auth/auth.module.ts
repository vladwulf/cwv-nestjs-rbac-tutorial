import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
