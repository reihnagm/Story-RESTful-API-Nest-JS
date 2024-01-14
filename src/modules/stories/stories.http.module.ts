// Service
import { StoriesService } from '@stories/stories.service';
import { StoryTypesService } from '@story-types/story-types.service';

// Controller
import { StoriesController } from '@stories/stories.controller';

// Module
import { Module } from '@nestjs/common';
import { StoriesModule } from '@modules/stories/stories.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    StoriesModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    })
  ],
  providers: [
    StoriesService, 
    StoryTypesService
  ],
  controllers: [StoriesController],
})

export class StoriesHttpModule {}
