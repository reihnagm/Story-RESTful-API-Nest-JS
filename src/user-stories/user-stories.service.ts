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
            const query = `SELECT u.uid, u.email, u.phone, 
            GROUP_CONCAT(s.uid) story_id
            FROM user_stories us 
            INNER JOIN users u ON us.user_id = u.uid
            INNER JOIN stories s ON us.story_id = s.uid
            GROUP BY u.id, u.email, u.phone`

            return this.connection.query(query);
        } catch(e) {
            this.logger.error(e.message, e.stack);
        }
    }
    
    async findAllById(@Param('id') id: string) : Promise<[]> {
        try {
            const query = `SELECT u.uid, u.email, u.phone, 
            GROUP_CONCAT(s.uid) story_id
            FROM user_stories us 
            INNER JOIN users u ON us.user_id = u.uid
            INNER JOIN stories s ON us.story_id = s.uid
            WHERE u.uid = '${id}'
            GROUP BY u.id, u.email, u.phone`;
            
            return this.connection.query(query);
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

}
