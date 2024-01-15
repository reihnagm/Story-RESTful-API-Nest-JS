import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Stories } from '@entities/stories.entity';
import { StoryTypes } from '@entities/story_types.entity';
import { UserStories } from '@entities/user_stories.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Stories, 
      StoryTypes,
      UserStories
    ]), 
    ConfigModule.forRoot()
  ],
  exports: [TypeOrmModule],
})
export class StoriesModule {}