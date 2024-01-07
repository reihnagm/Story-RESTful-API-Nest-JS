import { StoreStoryDto } from '@dto/story-content/store.dto';
import { UpdateStoryDto } from '@dto/story-content/update.dto';
import { StoryTypeService } from 'src/story-content-type/story-type.service';
export declare class StoryTypeController {
    private storyTypeService;
    constructor(storyTypeService: StoryTypeService);
    all(_: Request, res: Response): Promise<void>;
    store(data: StoreStoryDto, _: Request, res: Response): Promise<void>;
    update(data: UpdateStoryDto, _: Request, res: Response, uid: string): Promise<any>;
    deleteStoryViewContent(_: Request, res: Response, uid: string): Promise<any>;
}
