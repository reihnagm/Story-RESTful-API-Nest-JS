// Service
import { StoryContentTypeService } from '@story-type/story-content-type.service';

// Controller
import { StoryContentTypeController } from '@story-type/story-content-type.controller';

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
  providers: [StoryContentTypeService],
  controllers: [StoryContentTypeController]
})

export class StoryContentTypeHttpModule {}
