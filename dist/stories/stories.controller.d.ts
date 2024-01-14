/// <reference types="multer" />
import { StoreStoriesDto } from '@dto/stories/store.dto';
import { UpdateStoriesDto } from '@dto/stories/update.dto';
import { StoriesService } from '@stories/stories.service';
import { StoryTypesService } from '@story-types/story-types.service';
export declare class StoriesController {
    private storiesService;
    private storyTypesService;
    constructor(storiesService: StoriesService, storyTypesService: StoryTypesService);
    all(_: Request, res: Response): Promise<void>;
    single(_: Request, res: Response, uid: string): Promise<void>;
    store(data: StoreStoriesDto, _: Request, res: Response): Promise<void>;
    update(data: UpdateStoriesDto, _: Request, res: Response, uid: string): Promise<void>;
    delete(_: Request, res: Response, uid: string): Promise<void>;
    validateStore(data: StoreStoriesDto): void;
    validateUpdate(data: UpdateStoriesDto): void;
    uploadFile(file: Express.Multer.File): void;
}
