import { Repository } from 'typeorm';
import { Stories } from '@entities/stories.entity';
import { StoreStoriesDto } from '@dto/stories/store.dto';
export declare class StoriesService {
    private storiesRepository;
    constructor(storiesRepository: Repository<Stories>);
    findAll(): Promise<Stories[]>;
    find(uid: string): Promise<Stories>;
    update(uid: any, data: Stories): Promise<any>;
    store(data: StoreStoriesDto): Promise<any>;
    destroy(uid: any): Promise<any>;
}
