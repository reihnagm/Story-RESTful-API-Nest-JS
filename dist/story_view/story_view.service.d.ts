import { Repository } from 'typeorm';
import { StoryViewContent } from '@entities/story_view_content.entity';
import { StoryViewType } from '@entities/story_view_type.entity';
import { StoreStoryViewDto } from '@dto/store-story-view.dto';
export declare class StoryViewService {
    private usersRepository;
    constructor(usersRepository: Repository<StoryViewContent>);
    findAllStoryViewContent(): Promise<StoryViewContent[]>;
    findStoryViewContent(uid: string): Promise<StoryViewContent>;
    update(uid: any, data: StoryViewContent): Promise<import("typeorm").UpdateResult>;
    findAllStoryContentType(uid: string): Promise<StoryViewType>;
    storeStoryViewContent(data: StoreStoryViewDto): Promise<StoreStoryViewDto & StoryViewContent>;
    destroyStoryViewContent(uid: any): Promise<import("typeorm").DeleteResult>;
}
