import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from '@entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auth])],
  exports: [TypeOrmModule],
})
export class AuthModule {}