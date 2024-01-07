import { Repository } from 'typeorm';
import { StoryContentTypes } from '@entities/story_content_type.entity';
import { StoreStoryContentTypeDto } from '@dto/story-content-type/store.dto';
export declare class StoryContentTypeService {
    private storyContentTypeRepository;
    constructor(storyContentTypeRepository: Repository<StoryContentTypes>);
    findAll(): Promise<StoryContentTypes[]>;
    find(uid: string): Promise<StoryContentTypes>;
    update(uid: any, data: StoryContentTypes): Promise<import("typeorm").UpdateResult>;
    store(data: StoreStoryContentTypeDto): Promise<StoreStoryContentTypeDto & StoryContentTypes>;
    destroy(uid: any): Promise<import("typeorm").DeleteResult>;
}
