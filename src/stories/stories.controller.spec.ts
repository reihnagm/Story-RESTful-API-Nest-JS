import { Test, TestingModule } from '@nestjs/testing';
import { StoriesController } from '@stories/stories.controller';
import { StoriesService } from '@stories/stories.service';

describe('StoryContentController', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StoriesController],
      providers: [StoriesService],
    }).compile();
  });
});
