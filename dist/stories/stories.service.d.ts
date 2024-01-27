import { Repository } from 'typeorm';
import { Stories } from '@entities/stories.entity';
import { StoreStoriesDto } from '@dto/stories/store.dto';
import { WinstonLoggerService } from 'src/winston.logger.service';
export declare class StoriesService {
    private storiesRepository;
    private readonly logger;
    constructor(storiesRepository: Repository<Stories>, logger: WinstonLoggerService);
    findAll(): Promise<Stories[]>;
    findAllById(id: string): Promise<Stories[]>;
    find(id: string): Promise<Stories>;
    update(id: any, data: Stories): Promise<import("typeorm").UpdateResult>;
    store(data: StoreStoriesDto): Promise<string>;
    destroy(id: any): Promise<import("typeorm").DeleteResult>;
}
