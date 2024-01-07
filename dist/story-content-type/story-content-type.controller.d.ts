import { StoryContentTypeService } from '@story-type/story-content-type.service';
import { StoreStoryContentTypeDto } from '@dto/story-content-type/store.dto';
import { UpdateStoryContentTypeDto } from '@dto/story-content-type/update.dto';
export declare class StoryContentTypeController {
    private storyContentTypeService;
    constructor(storyContentTypeService: StoryContentTypeService);
    all(_: Request, res: Response): Promise<void>;
    single(_: Request, res: Response, uid: string): Promise<void>;
    store(data: StoreStoryContentTypeDto, _: Request, res: Response): Promise<void>;
    update(data: UpdateStoryContentTypeDto, _: Request, res: Response, uid: string): Promise<void>;
    delete(_: Request, res: Response, uid: string): Promise<void>;
}
