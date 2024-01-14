import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stories } from '@entities/stories.entity';
import { StoryTypes } from '@entities/story_types.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Stories, 
      StoryTypes
    ]), 
    ConfigModule.forRoot()
  ],
  exports: [TypeOrmModule],
})
export class StoriesModule {}