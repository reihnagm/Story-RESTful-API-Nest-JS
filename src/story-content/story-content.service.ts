import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoryContents } from '@entities/story_content.entity';
import { Param } from '@nestjs/common';
import { StoreStoryContentDto } from '@dto/story-content/store.dto';

@Injectable()
export class StoryContentService {
  constructor(
    @InjectRepository(StoryContents)
    private storyContentRepository: Repository<StoryContents>,
  ) {}

  async findAll() : Promise<StoryContents[]> {
    try {
      return await this.storyContentRepository
      .createQueryBuilder("story")
      .select("story.uid, story.content, story.background_color, story.is_background_color, story.uid_content_type, story.created_at, story.updated_at")
      .orderBy("story.id", "DESC")
      .getRawMany()
    } catch(e) {
      console.log(e);
    }
  }

  async find(@Param('uid') uid: string) : Promise<StoryContents> {
    try {
      return await this.storyContentRepository
      .createQueryBuilder("story")
      .select("story.uid, story.content, story.background_color, story.is_background_color, story.uid_content_type, story.created_at, story.updated_at")
      .where("uid = :uid", { uid: uid })
      .getRawOne()
    } catch(e) {
      console.log(e);
    }
  }
  
  async update(@Param('uid') uid: any, data : StoryContents) {
    try { 
      return await this.storyContentRepository.update({uid: uid}, {
        content: data.content
      });
    } catch(e) {
      console.log(e);
    }
  }

  async store(@Param('uid') data: StoreStoryContentDto) {
    try { 
      return await this.storyContentRepository.save(data);
    } catch(e) {
      console.log(e);
    }
  }

  async destroy(@Param('uid') uid: any) {
    try {
      return await this.storyContentRepository.delete({ 
        uid: uid
      });
    } catch(e) {
      console.log(e);
    }
  }
}
