import { Test, TestingModule } from '@nestjs/testing';
import { StoryTypesService } from '@story-types/story-types.service';
import { StoryTypesController } from './story-types.controller';

describe('StoryTypeController', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StoryTypesController],
      providers: [StoryTypesService],
    }).compile();
  });
});
