/// <reference types="multer" />
import { FormStoreStoriesDto } from '@dto/stories/form.store.dto';
import { UpdateStoriesDto } from '@dto/stories/update.dto';
import { StoriesService } from '@stories/stories.service';
import { StoryTypesService } from '@story-types/story-types.service';
import { UserStoriesService } from 'src/user-stories/user-stories.service';
import { WinstonLoggerService } from 'src/winston.logger.service';
import { UsersService } from '@auth/users.service';
export declare class StoriesController {
    private storiesService;
    private storyTypesService;
    private userStoriesService;
    private users;
    private readonly logger;
    constructor(storiesService: StoriesService, storyTypesService: StoryTypesService, userStoriesService: UserStoriesService, users: UsersService, logger: WinstonLoggerService);
    all(_: Request, res: Response): Promise<void>;
    single(_: Request, res: Response, id: string): Promise<void>;
    store(auth: string, data: FormStoreStoriesDto, _: Request, res: Response): Promise<void>;
    update(data: UpdateStoriesDto, _: Request, res: Response, id: string): Promise<void>;
    delete(_: Request, res: Response, uid: string): Promise<void>;
    validateStore(data: FormStoreStoriesDto): void;
    validateUpdate(id: string): void;
    uploadFile(file: Express.Multer.File): void;
}
