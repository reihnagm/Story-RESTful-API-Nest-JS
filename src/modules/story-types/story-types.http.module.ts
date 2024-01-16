// Service
import { StoryTypesService } from '@story-types/story-types.service';

// Controller
import { StoryTypesController } from '@story-types/story-types.controller';

// Module
import { Module } from '@nestjs/common';
import { StoriesModule } from '@modules/stories/stories.module';
import { JwtModule } from '@nestjs/jwt';
import { WinstonLoggerService } from 'src/winston.logger.service';

@Module({
  imports: [
    StoriesModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    })
  ],
  providers: [
    StoryTypesService,
    WinstonLoggerService
  ],
  controllers: [StoryTypesController]
})

export class StoryTypesHttpModule {}
