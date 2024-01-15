import { Module } from '@nestjs/common';

// Service
import { UsersService } from '@auth/users.service';

// Controller
import { UsersController } from '@auth/users.controller';

// Module
import { UsersModule } from '@modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UsersModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 5
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET
    })
  ],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
  controllers: [UsersController]
})

export class UsersHttpModule {}
