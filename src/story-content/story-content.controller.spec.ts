import { Test, TestingModule } from '@nestjs/testing';
import { StoryContentController } from '@story/story-content.controller';
import { StoryContentService } from '@story/story-content.service';

describe('StoryContentController', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StoryContentController],
      providers: [StoryContentService],
    }).compile();
  });
});
