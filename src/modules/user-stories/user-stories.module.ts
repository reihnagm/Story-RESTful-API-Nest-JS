import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserStories } from '@entities/user_stories.entity';
import { Stories } from '@entities/stories.entity';
import { StoryTypes } from '@entities/story_types.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserStories,
      Stories,
      StoryTypes
    ]), 
    ConfigModule.forRoot()
  ],
  exports: [TypeOrmModule],
})
export class UserStoriesModule {}