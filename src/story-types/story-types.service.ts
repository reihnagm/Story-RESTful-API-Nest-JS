import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoryTypes } from '@entities/story_types.entity';
import { Param } from '@nestjs/common';
import { StoreStoryTypesDto } from '@dto/story-types/store.dto';
import { WinstonLoggerService } from 'src/winston.logger.service';

@Injectable()
export class StoryTypesService {
  constructor(
    @InjectRepository(StoryTypes)
    private storyTypesRepository: Repository<StoryTypes>,
    private readonly logger: WinstonLoggerService
  ) {}

  async findAll() : Promise<StoryTypes[]> {
    try {
      return await this.storyTypesRepository
      .createQueryBuilder("s")
      .select("s.id, s.type, s.created_at, s.updated_At")
      .orderBy("s.id", "ASC")
      .getRawMany();
    } catch(e) {
      this.logger.error(e.message, e.stack);
    }
  }

  async find(@Param('id') id: string) : Promise<StoryTypes> {
    try {
      return await this.storyTypesRepository
      .createQueryBuilder("s")
      .select("s.id, s.type, s.created_at, s.updated_at")
      .where("s.id = :id", {id: id})
      .getRawOne();
    } catch(e) {
      this.logger.error(e.message, e.stack);
    }
  }

  async update(@Param('id') id: any, data : StoryTypes) {
    try { 
      return await this.storyTypesRepository.update({id: id}, {
        type: data.type
      });
    } catch(e) {
      this.logger.error(e.message, e.stack);
    }
  }

  async store(@Param('id') data: StoreStoryTypesDto) {
    try { 
      return await this.storyTypesRepository.save(data);
    } catch(e) {
      this.logger.error(e.message, e.stack);
    }
  }

  async destroy(@Param('id') id: any) {
    try {
      return await this.storyTypesRepository.delete({ 
        id: id
      });
    } catch(e) {
      this.logger.error(e.message, e.stack);
    }
  }
}
