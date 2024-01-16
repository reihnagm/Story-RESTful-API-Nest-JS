import { Repository } from 'typeorm';
import { UserStories } from '@entities/user_stories.entity';
import { StoreUserStoriesDto } from '@dto/user-stories/store.dto';
import { WinstonLoggerService } from 'src/winston.logger.service';
export declare class UserStoriesService {
    private userStories;
    private readonly logger;
    constructor(userStories: Repository<UserStories>, logger: WinstonLoggerService);
    findAll(): Promise<UserStories[]>;
    find(uid: string): Promise<UserStories>;
    update(uid: any, data: UserStories): Promise<import("typeorm").UpdateResult>;
    store(data: StoreUserStoriesDto): Promise<StoreUserStoriesDto & UserStories>;
    destroy(uid: any): Promise<import("typeorm").DeleteResult>;
}
