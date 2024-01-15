import { UpdateStoriesDto } from '@dto/stories/update.dto';
import { FormUserStoriesDto } from '@dto/user-stories/form.store.dto';
import { UserStoriesService } from './user-stories.service';
export declare class UserStoriesController {
    private userStoriesService;
    constructor(userStoriesService: UserStoriesService);
    all(_: Request, res: Response): Promise<void>;
    single(_: Request, res: Response, uid: string): Promise<void>;
    store(data: FormUserStoriesDto, _: Request, res: Response): Promise<void>;
    update(data: UpdateStoriesDto, _: Request, res: Response, id: string): Promise<void>;
    delete(_: Request, res: Response, uid: string): Promise<void>;
}
