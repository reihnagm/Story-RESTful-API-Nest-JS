/// <reference types="multer" />
import { StoreStoryDto } from '@dto/story-content/store.dto';
import { UpdateStoryDto } from '@dto/story-content/update.dto';
import { StoryService } from 'src/story-content/story.service';
export declare const editFileName: (_: any, file: {
    originalname: string;
}, callback: (arg0: any, arg1: string) => void) => void;
export declare class StoryContentController {
    private storyService;
    constructor(storyService: StoryService);
    all(_: Request, res: Response, uid: string): Promise<void>;
    store(data: StoreStoryDto, _: Request, res: Response): Promise<void>;
    update(data: UpdateStoryDto, _: Request, res: Response, uid: string): Promise<any>;
    deleteStoryViewContent(_: Request, res: Response, uid: string): Promise<any>;
    uploadFile(file: Express.Multer.File): void;
}
