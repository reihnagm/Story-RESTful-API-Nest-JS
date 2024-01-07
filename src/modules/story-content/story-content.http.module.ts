// Service
import { StoryContentService } from '@story/story-content.service';
import { StoryContentTypeService } from '@story-type/story-content-type.service';

// Controller
import { StoryContentController } from '@story/story-content.controller';

// Module
import { Module } from '@nestjs/common';
import { StoryModule } from '@modules/story-content/story-content.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    StoryModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    })
  ],
  providers: [StoryContentService, StoryContentTypeService],
  controllers: [StoryContentController]
})

export class StoryContentHttpModule {}
