/// <reference types="multer" />
import { FormStoreStoriesDto } from '@dto/stories/form.store.dto';
import { UpdateStoriesDto } from '@dto/stories/update.dto';
import { StoriesService } from '@stories/stories.service';
import { StoryTypesService } from '@story-types/story-types.service';
import { UserStoriesService } from 'src/user-stories/user-stories.service';
export declare class StoriesController {
    private storiesService;
    private storyTypesService;
    private userStoriesService;
    constructor(storiesService: StoriesService, storyTypesService: StoryTypesService, userStoriesService: UserStoriesService);
    all(_: Request, res: Response): Promise<void>;
    single(_: Request, res: Response, uid: string): Promise<void>;
    store(data: FormStoreStoriesDto, _: Request, res: Response): Promise<void>;
    update(data: UpdateStoriesDto, _: Request, res: Response, id: string): Promise<void>;
    delete(_: Request, res: Response, uid: string): Promise<void>;
    validateStore(data: FormStoreStoriesDto): void;
    validateUpdate(id: string): void;
    uploadFile(file: Express.Multer.File): void;
}
