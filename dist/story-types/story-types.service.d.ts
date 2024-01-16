import { Repository } from 'typeorm';
import { StoryTypes } from '@entities/story_types.entity';
import { StoreStoryTypesDto } from '@dto/story-types/store.dto';
import { WinstonLoggerService } from 'src/winston.logger.service';
export declare class StoryTypesService {
    private storyTypesRepository;
    private readonly logger;
    constructor(storyTypesRepository: Repository<StoryTypes>, logger: WinstonLoggerService);
    findAll(): Promise<StoryTypes[]>;
    find(id: string): Promise<StoryTypes>;
    update(id: any, data: StoryTypes): Promise<import("typeorm").UpdateResult>;
    store(data: StoreStoryTypesDto): Promise<StoreStoryTypesDto & StoryTypes>;
    destroy(id: any): Promise<import("typeorm").DeleteResult>;
}
