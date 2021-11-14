import { Observable } from 'rxjs';
import { StoryViewContent } from '../interfaces/story_view.interface';
export declare class StoryViewService {
    private stories;
    findAll(): Observable<StoryViewContent>;
}
