import { StoryTypesService } from '@story-types/story-types.service';
import { StoreStoryTypesDto } from '@dto/story-types/store.dto';
import { UpdateStoryTypesDto } from '@dto/story-types/update.dto';
export declare class StoryTypesController {
    private storyTypesService;
    constructor(storyTypesService: StoryTypesService);
    all(_: Request, res: Response): Promise<void>;
    single(_: Request, res: Response, uid: string): Promise<void>;
    store(data: StoreStoryTypesDto, _: Request, res: Response): Promise<void>;
    update(data: UpdateStoryTypesDto, _: Request, res: Response, uid: string): Promise<void>;
    delete(_: Request, res: Response, uid: string): Promise<void>;
}
