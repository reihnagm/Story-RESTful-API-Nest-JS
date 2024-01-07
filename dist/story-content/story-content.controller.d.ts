/// <reference types="multer" />
import { StoreStoryContentDto } from '@dto/story-content/store.dto';
import { UpdateStoryContentDto } from '@dto/story-content/update.dto';
import { StoryContentService } from '@story/story-content.service';
import { StoryContentTypeService } from '@story-type/story-content-type.service';
export declare class StoryContentController {
    private storyContentService;
    private storyContentTypeService;
    constructor(storyContentService: StoryContentService, storyContentTypeService: StoryContentTypeService);
    all(_: Request, res: Response): Promise<void>;
    single(_: Request, res: Response, uid: string): Promise<void>;
    store(data: StoreStoryContentDto, _: Request, res: Response): Promise<void>;
    update(data: UpdateStoryContentDto, _: Request, res: Response, uid: string): Promise<void>;
    delete(_: Request, res: Response, uid: string): Promise<void>;
    validateStore(data: StoreStoryContentDto): void;
    validateUpdate(data: UpdateStoryContentDto): void;
    uploadFile(file: Express.Multer.File): void;
}
