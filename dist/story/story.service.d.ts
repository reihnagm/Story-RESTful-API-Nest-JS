import { Repository } from 'typeorm';
import { StoryContents } from '@entities/story_content.entity';
import { StoryTypes } from '@entities/story_type.entity';
import { StoreStoryDto } from '@dto/story-content/store-story.dto';
export declare class StoryService {
    private storyContentRepository;
    constructor(storyContentRepository: Repository<StoryContents>);
    findAll(): Promise<StoryContents[]>;
    find(uid: string): Promise<StoryContents>;
    update(uid: any, data: StoryContents): Promise<import("typeorm").UpdateResult>;
    findStoryType(uid: string): Promise<StoryTypes>;
    storeStoryContent(data: StoreStoryDto): Promise<StoreStoryDto & StoryContents>;
    destroyStoryContent(uid: any): Promise<import("typeorm").DeleteResult>;
}
