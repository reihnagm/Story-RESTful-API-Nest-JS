import { UserStoriesService } from './user-stories.service';
import { StoriesService } from '@stories/stories.service';
import { StoryTypesService } from '@story-types/story-types.service';
import { WinstonLoggerService } from 'src/winston.logger.service';
export declare class UserStoriesController {
    private userStoriesService;
    private stories;
    private storiesTypes;
    private readonly logger;
    constructor(userStoriesService: UserStoriesService, stories: StoriesService, storiesTypes: StoryTypesService, logger: WinstonLoggerService);
    all(_: Request, res: Response): Promise<void>;
    single(_: Request, res: Response, id: string): Promise<void>;
}
