import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Param } from '@nestjs/common';
import { UserStories } from '@entities/user_stories.entity';
import { StoreUserStoriesDto } from '@dto/user-stories/store.dto';
import { WinstonLoggerService } from 'src/winston.logger.service';

@Injectable()
export class UserStoriesService {

    constructor(
        @InjectRepository(UserStories)
        private readonly userStories: Repository<UserStories>,
        @InjectDataSource() private readonly connection: Connection,
        private readonly logger: WinstonLoggerService
    ) {}

    async findAll() : Promise<[]> {
        try {
            return this.connection.query(`
                SELECT u.email, u.phone FROM user_stories us 
                INNER JOIN users u ON us.user_id = u.uid
            `);
        } catch(e) {
            this.logger.error(e.message, e.stack);
        }
    }

    async find(@Param('uid') uid: string) : Promise<UserStories> {
        try {
            return await this.userStories
            .createQueryBuilder("s")
            .select("s.uid, s.user_id, s.story_id, s.created_at, s.updated_at")
            .where("uid = :uid", { uid: uid })
            .getRawOne();
        } catch(e) {
            this.logger.error(e.message, e.stack);
        }
    }
  
    async update(@Param('uid') uid: any, data : UserStories) {
        try { 
            return await this.userStories.update({uid: uid}, {
                user_id: data.user_id
            });
        } catch(e) {
            this.logger.error(e.message, e.stack);
        }
    }

    async store(@Param('data') data: StoreUserStoriesDto) {
        try { 
            return await this.userStories.save(data);
        } catch(e) {
            this.logger.error(e.message, e.stack);
        }
    }

    async destroy(@Param('uid') uid: any) {
        try {
            return await this.userStories.delete({ 
                uid: uid
            });
        } catch(e) {
            this.logger.error(e.message, e.stack);
        }
    }
}
