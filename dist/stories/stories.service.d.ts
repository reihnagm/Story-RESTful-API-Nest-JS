import { Repository } from 'typeorm';
import { Stories } from '@entities/stories.entity';
import { StoreStoriesDto } from '@dto/stories/store.dto';
export declare class StoriesService {
    private storiesRepository;
    constructor(storiesRepository: Repository<Stories>);
    findAll(): Promise<Stories[]>;
    find(uid: string): Promise<Stories>;
    update(uid: any, data: Stories): Promise<import("typeorm").UpdateResult>;
    store(data: StoreStoriesDto): Promise<StoreStoriesDto & Stories>;
    destroy(uid: any): Promise<import("typeorm").DeleteResult>;
}
