import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserStoriesService } from 'src/user-stories/user-stories.service';
import { UserStoriesModule } from './user-stories.module';
import { UserStoriesController } from 'src/user-stories/user-stories.controller';
import { WinstonLoggerService } from 'src/winston.logger.service';
import { StoriesService } from '@stories/stories.service';
import { StoryTypesService } from '@story-types/story-types.service';

@Module({
  imports: [
    UserStoriesModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    })
  ],
  providers: [
    UserStoriesService,
    StoriesService,
    StoryTypesService,
    WinstonLoggerService
  ],
  controllers: [UserStoriesController]
})

export class UserStoriesHttpModule {}