import { Repository } from 'typeorm';
import { StoryContents } from '@entities/story_content.entity';
import { StoreStoryContentDto } from '@dto/story-content/store.dto';
export declare class StoryContentService {
    private storyContentRepository;
    constructor(storyContentRepository: Repository<StoryContents>);
    findAll(): Promise<StoryContents[]>;
    find(uid: string): Promise<StoryContents>;
    update(uid: any, data: StoryContents): Promise<import("typeorm").UpdateResult>;
    store(data: StoreStoryContentDto): Promise<StoreStoryContentDto & StoryContents>;
    destroy(uid: any): Promise<import("typeorm").DeleteResult>;
}
