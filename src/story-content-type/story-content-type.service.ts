import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoryContentTypes } from '@entities/story_content_type.entity';
import { Param } from '@nestjs/common';
import { StoreStoryContentTypeDto } from '@dto/story-content-type/store.dto';

@Injectable()
export class StoryContentTypeService {
  constructor(
    @InjectRepository(StoryContentTypes)
    private storyContentTypeRepository: Repository<StoryContentTypes>,
  ) {}

  async findAll() : Promise<StoryContentTypes[]> {
    try {
      return await this.storyContentTypeRepository
      .createQueryBuilder("s")
      .select("s.uid, s.type, s.created_at, s.updated_At")
      .orderBy("s.id", "DESC")
      .getRawMany();
    } catch(e) {
      console.log(e);
    }
  }

  async find(@Param('uid') uid: string) : Promise<StoryContentTypes> {
    try {
      return await this.storyContentTypeRepository
      .createQueryBuilder("storytype")
      .select("storytype.id, storytype.uid, storytype.type")
      .where("storytype.uid = :uid", {uid: uid})
      .getRawOne();
    } catch(e) {
      console.log(e);
    }
  }

  async update(@Param('uid') uid: any, data : StoryContentTypes) {
    try { 
      return await this.storyContentTypeRepository.update({uid: uid}, {
        type: data.type
      });
    } catch(e) {
      console.log(e);
    }
  }

  async store(@Param('uid') data: StoreStoryContentTypeDto) {
    try { 
      return await this.storyContentTypeRepository.save(data);
    } catch(e) {
      console.log(e);
    }
  }

  async destroy(@Param('uid') uid: any) {
    try {
      return await this.storyContentTypeRepository.delete({ 
        uid: uid
      });
    } catch(e) {
      console.log(e);
    }
  }
}
