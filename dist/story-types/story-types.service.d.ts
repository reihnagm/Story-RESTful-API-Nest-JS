import { Repository } from 'typeorm';
import { StoryTypes } from '@entities/story_types.entity';
import { StoreStoryTypesDto } from '@dto/story-types/store.dto';
export declare class StoryTypesService {
    private storyTypesRepository;
    constructor(storyTypesRepository: Repository<StoryTypes>);
    findAll(): Promise<StoryTypes[]>;
    find(uid: string): Promise<StoryTypes>;
    update(uid: any, data: StoryTypes): Promise<import("typeorm").UpdateResult>;
    store(data: StoreStoryTypesDto): Promise<StoreStoryTypesDto & StoryTypes>;
    destroy(uid: any): Promise<import("typeorm").DeleteResult>;
}