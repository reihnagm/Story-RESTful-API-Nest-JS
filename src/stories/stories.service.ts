import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stories } from '@entities/stories.entity';
import { Param } from '@nestjs/common';
import { StoreStoriesDto } from '@dto/stories/store.dto';

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(Stories)
    private storiesRepository: Repository<Stories>,
  ) {}

  async findAll() : Promise<Stories[]> {
    try {
      return await this.storiesRepository
      .createQueryBuilder("s")
      .select("s.uid, s.caption, s.media, s.background_color, s.text_color, s.type, s.created_at, s.updated_at")
      .orderBy("s.id", "DESC")
      .getRawMany()
    } catch(e) {
      console.log(e);
    }
  }

  async find(@Param('uid') uid: string) : Promise<Stories> {
    try {
      return await this.storiesRepository
      .createQueryBuilder("s")
      .select("s.uid, s.caption, s.media, s.background_color, s.text_color, s.type, s.created_at, s.updated_at")
      .where("uid = :uid", { uid: uid })
      .getRawOne()
    } catch(e) {
      console.log(e);
    }
  }
  
  async update(@Param('uid') uid: any, data : Stories) {
    try { 
      return await this.storiesRepository.update({uid: uid}, {
        caption: data.caption
      });
    } catch(e) {
      console.log(e);
    }
  }

  async store(@Param('data') data: StoreStoriesDto) {
    try { 
      return await this.storiesRepository.save(data);
    } catch(e) {
      console.log(e);
    }
  }

  async destroy(@Param('uid') uid: any) {
    try {
      return await this.storiesRepository.delete({ 
        uid: uid
      });
    } catch(e) {
      console.log(e);
    }
  }
}
