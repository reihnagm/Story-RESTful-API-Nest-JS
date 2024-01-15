import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserStories } from '@entities/user_stories.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserStories
    ]), 
    ConfigModule.forRoot()
  ],
  exports: [TypeOrmModule],
})
export class UserStoriesModule {}