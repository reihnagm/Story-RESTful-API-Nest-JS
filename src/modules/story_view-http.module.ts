import { Module } from '@nestjs/common';
import { StoryViewModule } from '@modules/story_view.module';
import { StoryViewService } from '@story/story_view.service';
import { StoryViewController } from '@story/story_view.controller';

@Module({
  imports: [StoryViewModule],
  providers: [StoryViewService],
  controllers: [StoryViewController]
})

export class StoryViewHttpModule {}
