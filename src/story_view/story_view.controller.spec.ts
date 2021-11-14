import { Test, TestingModule } from '@nestjs/testing';
import { StoryViewController } from 'src/story_view/story_view.controller';
import { StoryViewService } from 'src/story_view/story_view.service';


describe('StoryVieController', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StoryViewController],
      providers: [StoryViewService],
    }).compile();
  });
});
