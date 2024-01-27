import { Users } from './users.entity';
import { Stories } from './stories.entity';
export declare class UserStories {
    id: any;
    uid: string;
    user_id: any;
    story_id: any;
    created_at: any;
    updated_at: any;
    user: Users;
    story: Stories;
}
