import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoryTypes } from '@entities/story_types.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StoryTypes
    ]), 
    ConfigModule.forRoot()
  ],
  exports: [TypeOrmModule],
})
export class StoryTypesModule {}