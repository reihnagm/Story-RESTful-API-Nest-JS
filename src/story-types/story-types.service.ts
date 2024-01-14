import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoryTypes } from '@entities/story_types.entity';
import { Param } from '@nestjs/common';
import { StoreStoryTypesDto } from '@dto/story-types/store.dto';

@Injectable()
export class StoryTypesService {
  constructor(
    @InjectRepository(StoryTypes)
    private storyTypesRepository: Repository<StoryTypes>,
  ) {}

  async findAll() : Promise<StoryTypes[]> {
    try {
      return await this.storyTypesRepository
      .createQueryBuilder("s")
      .select("s.uid, s.type, s.created_at, s.updated_At")
      .orderBy("s.id", "DESC")
      .getRawMany();
    } catch(e) {
      console.log(e);
    }
  }

  async find(@Param('uid') uid: string) : Promise<StoryTypes> {
    try {
      return await this.storyTypesRepository
      .createQueryBuilder("s")
      .select("s.id, s.uid, s.type")
      .where("s.uid = :uid", {uid: uid})
      .getRawOne();
    } catch(e) {
      console.log(e);
    }
  }

  async update(@Param('uid') uid: any, data : StoryTypes) {
    try { 
      return await this.storyTypesRepository.update({uid: uid}, {
        type: data.type
      });
    } catch(e) {
      console.log(e);
    }
  }

  async store(@Param('uid') data: StoreStoryTypesDto) {
    try { 
      return await this.storyTypesRepository.save(data);
    } catch(e) {
      console.log(e);
    }
  }

  async destroy(@Param('uid') uid: any) {
    try {
      return await this.storyTypesRepository.delete({ 
        uid: uid
      });
    } catch(e) {
      console.log(e);
    }
  }
}
