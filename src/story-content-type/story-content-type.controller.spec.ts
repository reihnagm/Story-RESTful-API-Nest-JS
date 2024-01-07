import { Test, TestingModule } from '@nestjs/testing';
import { StoryContentTypeService } from '@story-type/story-content-type.service';
import { StoryContentTypeController } from './story-content-type.controller';

describe('StoryTypeController', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StoryContentTypeController],
      providers: [StoryContentTypeService],
    }).compile();
  });
});
