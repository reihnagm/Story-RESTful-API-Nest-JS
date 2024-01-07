import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoryContents } from '@entities/story_content.entity';
import { StoryContentTypes } from '@entities/story_content_type.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([
    StoryContents, 
    StoryContentTypes
]), ConfigModule.forRoot()],
  exports: [TypeOrmModule],
})
export class StoryModule {}