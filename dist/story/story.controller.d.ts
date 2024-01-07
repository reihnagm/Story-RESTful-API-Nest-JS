/// <reference types="multer" />
import { StoreStoryDto } from '@dto/story-content/store-story.dto';
import { UpdateStoryDto } from '@dto/story-content/update-story.dto';
import { StoryService } from '@story/story.service';
export declare const editFileName: (_: any, file: {
    originalname: string;
}, callback: (arg0: any, arg1: string) => void) => void;
export declare class StoryController {
    private storyService;
    constructor(storyService: StoryService);
    all(_: Request, res: Response, uid: string): Promise<void>;
    store(data: StoreStoryDto, _: Request, res: Response): Promise<void>;
    update(data: UpdateStoryDto, _: Request, res: Response, uid: string): Promise<any>;
    deleteStoryViewContent(_: Request, res: Response, uid: string): Promise<any>;
    uploadFile(file: Express.Multer.File): void;
}
