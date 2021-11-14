import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoryViewContent } from '@entities/story_view_content.entity';
import { StoryViewType } from '@entities/story_view_type.entity';
import { Param } from '@nestjs/common';
import { StoreStoryViewDto } from '@dto/store-story-view.dto';

@Injectable()
export class StoryViewService {
  constructor(
    @InjectRepository(StoryViewContent)
    private storyViewContentRepository: Repository<StoryViewContent>,
  ) {}

  async findAllStoryViewContent() : Promise<StoryViewContent[]> {
    try {
      return await this.storyViewContentRepository
      .createQueryBuilder("a")
      .select("a.uid, a.content, a.backgroundColor, a.isBackgroundColor, a.uid_content_type, a.createdAt, a.updatedAt")
      .orderBy("a.id", "DESC")
      .getRawMany()
    } catch(e) {
      console.log(e);
    }
  }

  async findStoryViewContent(uid: string) : Promise<StoryViewContent> {
    try {
      return await this.storyViewContentRepository
      .createQueryBuilder("a")
      .select("a.uid, a.content, a.backgroundColor, a.isBackgroundColor, a.uid_content_type, a.createdAt, a.updatedAt")
      .where("uid = :uid", {uid: uid})
      .getRawOne()
    } catch(e) {
      console.log(e);
    }
  }
  
  async update(@Param('uid') uid: any, data : StoryViewContent) {
    try { 
      return await this.storyViewContentRepository.update({uid: uid}, {
        content: data.content
      });
    } catch(e) {
      console.log(e);
    }
  }

  async findAllStoryContentType(@Param('uid') uid: string) : Promise<StoryViewType> {
    try {
      return await this.storyViewContentRepository
      .createQueryBuilder("a")
      .select("a.id, a.uid, a.type")
      .where("a.uid = :uid", {uid: uid})
      .getRawOne()
    } catch(e) {
      console.log(e);
    }
  }

  async storeStoryViewContent(@Param('uid') data: StoreStoryViewDto) {
    try { 
      return await this.storyViewContentRepository.save(data);
    } catch(e) {
      console.log(e);
    }
  }

  async destroyStoryViewContent(@Param('uid') uid: any) {
    try {
      return await this.storyViewContentRepository.delete({ 
        uid: uid
      });
    } catch(e) {
      console.log(e);
    }
  }
}
