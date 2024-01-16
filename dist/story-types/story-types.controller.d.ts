import { StoryTypesService } from '@story-types/story-types.service';
import { StoreStoryTypesDto } from '@dto/story-types/store.dto';
import { UpdateStoryTypesDto } from '@dto/story-types/update.dto';
import { WinstonLoggerService } from 'src/winston.logger.service';
export declare class StoryTypesController {
    private storyTypesService;
    private readonly logger;
    constructor(storyTypesService: StoryTypesService, logger: WinstonLoggerService);
    all(_: Request, res: Response): Promise<void>;
    single(_: Request, res: Response, uid: string): Promise<void>;
    store(data: StoreStoryTypesDto, _: Request, res: Response): Promise<void>;
    update(data: UpdateStoryTypesDto, _: Request, res: Response, id: string): Promise<void>;
    delete(_: Request, res: Response, uid: string): Promise<void>;
}
