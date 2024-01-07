import { Repository } from 'typeorm';
import { StoryTypes } from '@entities/story_type.entity';
import { StoreStoryDto } from '@dto/story-content/store.dto';
export declare class StoryTypeService {
    private storyTypeRepository;
    constructor(storyTypeRepository: Repository<StoryTypes>);
    findAll(): Promise<StoryTypes[]>;
    find(uid: string): Promise<StoryTypes>;
    update(uid: any, data: StoryTypes): Promise<import("typeorm").UpdateResult>;
    store(data: StoreStoryDto): Promise<StoreStoryDto & StoryTypes>;
    destroy(uid: any): Promise<import("typeorm").DeleteResult>;
}
