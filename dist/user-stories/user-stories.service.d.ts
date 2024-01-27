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
    findAllById(id: string): Promise<[]>;
    store(data: StoreUserStoriesDto): Promise<StoreUserStoriesDto & UserStories>;
}
