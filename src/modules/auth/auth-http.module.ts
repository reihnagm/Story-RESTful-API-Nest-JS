import { Module } from '@nestjs/common';

// Service
import { AuthService } from '@auth/auth.service';

// Controller
import { AuthController } from '@auth/auth.controller';

// Module
import { AuthModule } from '@modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET
    })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})

export class AuthHttpModule {}
