import { Module } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { AuthController } from '@auth/auth.controller';
import { AuthModule } from '@modules/auth.module';

@Module({
  imports: [AuthModule],
  providers: [AuthService],
  controllers: [AuthController]
})

export class AuthHttpModule {}
