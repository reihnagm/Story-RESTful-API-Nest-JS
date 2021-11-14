import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { getRepository } from 'typeorm';
import { StoryViewContent } from '@entities/story_view_content.entity';
import { StoryViewType } from '@entities/story_view_type.entity';
import { Param } from '@nestjs/common';
import { StoreStoryViewDto } from '@dto/store-story-view.dto';
import { UpdateStoryViewDto } from '@dto/update-story-view.dto';

@Injectable()
export class StoryViewService {
  constructor(
    @InjectRepository(StoryViewContent)
    private usersRepository: Repository<StoryViewContent>,
  ) {}
  async findAllStoryViewContent() : Promise<StoryViewContent[]> {
    return await getRepository(StoryViewContent)
    .createQueryBuilder("a")
    .select("a.uid, a.content, a.backgroundColor, a.isBackgroundColor, a.uid_content_type, a.createdAt, a.updatedAt")
    .orderBy("a.id", "DESC")
    .getRawMany()
  }

  async findStoryViewContent(uid: string) : Promise<StoryViewContent> {
    return await getRepository(StoryViewContent)
    .createQueryBuilder("a")
    .select("a.uid, a.content, a.backgroundColor, a.isBackgroundColor, a.uid_content_type, a.createdAt, a.updatedAt")
    .where("uid = :uid", {uid: uid})
    .getRawOne()
  }
  
  async update(@Param('uid') uid: any, data : StoryViewContent) {
    return await getRepository(StoryViewContent).update({uid: uid}, {
      content: data.content
    });
  }

  async findAllStoryContentType(@Param('uid') uid: string) : Promise<StoryViewType> {
    return await getRepository(StoryViewType)
    .createQueryBuilder("a")
    .select("a.id, a.uid, a.type")
    .where("a.uid = :uid", {uid: uid})
    .getRawOne()
  }

  async storeStoryViewContent(@Param('uid') data: StoreStoryViewDto) {
    return await getRepository(StoryViewContent).save(data);
  }

  async destroyStoryViewContent(@Param('uid') uid: any) {
    return await getRepository(StoryViewContent).delete({ 
      uid: uid
    });
  }
}
