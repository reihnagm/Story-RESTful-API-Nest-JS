import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stories } from '@entities/stories.entity';
import { Param } from '@nestjs/common';
import { StoreStoriesDto } from '@dto/stories/store.dto';
import { WinstonLoggerService } from 'src/winston.logger.service';
// import { Interval } from '@nestjs/schedule';

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(Stories)
    private storiesRepository: Repository<Stories>,
    private readonly logger: WinstonLoggerService
  ) {}

  // @Interval(30000)
  // handleInterval() {
  //   console.log("Called every 30 seconds")
  // }

  async findAll() : Promise<Stories[]> {
    try {
      return await this.storiesRepository
      .createQueryBuilder("s")
      .select("s.uid, s.caption, s.media, s.background_color, s.text_color, s.type, s.created_at, s.updated_at")
      .orderBy("s.id", "DESC")
      .getRawMany()
    } catch(e) {
      this.logger.error(e.message, e.stack);
    }
  }

  async find(@Param('id') id: string) : Promise<Stories> {
    try {
      return await this.storiesRepository
      .createQueryBuilder("s")
      .select("s.uid, s.caption, s.media, s.background_color, s.text_color, s.type, s.created_at, s.updated_at")
      .where("uid = :uid", { uid: id })
      .getRawOne()
    } catch(e) {
      this.logger.error(e.message, e.stack);
    }
  }
  
  async update(@Param('id') id: any, data : Stories) {
    try { 
      return await this.storiesRepository.update({uid: id}, {
        caption: data.caption
      });
    } catch(e) {
      this.logger.error(e.message, e.stack);
    }
  }

  async store(@Param('data') data: StoreStoriesDto) {
    try { 
      return await this.storiesRepository.save(data);
    } catch(e) {
      this.logger.error(e.message, e.stack);
    }
  }

  async destroy(@Param('id') id: any) {
    try {
      return await this.storiesRepository.delete({ 
        uid: id
      });
    } catch(e) {
      this.logger.error(e.message, e.stack);
    }
  }
}
