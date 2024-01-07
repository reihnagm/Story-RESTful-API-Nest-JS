import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '@entities/auth.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([
    Users
  ]), ConfigModule.forRoot()],
  exports: [TypeOrmModule],
})

export class AuthModule {}