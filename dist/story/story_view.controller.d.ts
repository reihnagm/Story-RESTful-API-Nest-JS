import { Observable } from 'rxjs/internal/Observable';
import { StoryViewContent } from 'src/interfaces/story_view.interface';
import { StoryViewService } from './story_view.service';
export declare class StoryViewController {
    private readonly storyViewService;
    constructor(storyViewService: StoryViewService);
    getStoryViews(): Observable<StoryViewContent>;
}
