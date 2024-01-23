import { Connection, Repository } from 'typeorm';
import { UserStories } from '@entities/user_stories.entity';
import { StoreUserStoriesDto } from '@dto/user-stories/store.dto';
import { WinstonLoggerService } from 'src/winston.logger.service';
export declare class UserStoriesService {
    private readonly userStories;
    private readonly connection;
    private readonly logger;
    constructor(userStories: Repository<UserStories>, connection: Connection, logger: WinstonLoggerService);
    findAll(): Promise<[]>;
    find(uid: string): Promise<UserStories>;
    update(uid: any, data: UserStories): Promise<import("typeorm").UpdateResult>;
    store(data: StoreUserStoriesDto): Promise<StoreUserStoriesDto & UserStories>;
    destroy(uid: any): Promise<import("typeorm").DeleteResult>;
}
