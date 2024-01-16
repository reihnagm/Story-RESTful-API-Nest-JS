import { Repository } from 'typeorm';
import { Stories } from '@entities/stories.entity';
import { StoreStoriesDto } from '@dto/stories/store.dto';
export declare class StoriesService {
    private storiesRepository;
    constructor(storiesRepository: Repository<Stories>);
    findAll(): Promise<Stories[]>;
    find(id: string): Promise<Stories>;
    update(id: any, data: Stories): Promise<import("typeorm").UpdateResult>;
    store(data: StoreStoriesDto): Promise<StoreStoriesDto & Stories>;
    destroy(id: any): Promise<import("typeorm").DeleteResult>;
}
