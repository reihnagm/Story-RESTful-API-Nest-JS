/// <reference types="multer" />
import { StoreStoryViewDto } from '@dto/store-story-view.dto';
import { UpdateStoryViewDto } from '@dto/update-story-view.dto';
import { StoryViewService } from '@story/story_view.service';
export declare const editFileName: (req: any, file: {
    originalname: string;
}, callback: (arg0: any, arg1: string) => void) => void;
export declare class StoryViewController {
    private readonly storyViewService;
    constructor(storyViewService: StoryViewService);
    all(req: Request, res: Response, uid: string): Promise<void>;
    store(data: StoreStoryViewDto, req: Request, res: Response): Promise<void>;
    update(data: UpdateStoryViewDto, uid: string, req: Request, res: Response): Promise<void>;
    uploadFile(file: Express.Multer.File): void;
    deleteStoryViewContent(req: Request, res: Response, uid: string): Promise<any>;
}
