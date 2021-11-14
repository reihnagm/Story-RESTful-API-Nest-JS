import { StoreStoryViewDto } from '@dto/store-story-view.dto';
import { StoryViewService } from '@story/story_view.service';
export declare class StoryViewController {
    private readonly storyViewService;
    constructor(storyViewService: StoryViewService);
    all(req: Request, res: Response): Promise<void>;
    store(data: StoreStoryViewDto, req: Request, res: Response): Promise<void>;
}
