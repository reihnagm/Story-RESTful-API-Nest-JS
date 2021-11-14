import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoryViewContent } from '@entities/story_view_content.entity';
import { StoryViewType } from '@entities/story_view_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StoryViewContent, StoryViewType])],
  exports: [TypeOrmModule],
})
export class StoryViewModule {}