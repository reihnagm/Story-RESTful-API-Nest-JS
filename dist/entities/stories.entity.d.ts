import { Users } from './users.entity';
import { StoryTypes } from './story_types.entity';
export declare class Stories {
    id: any;
    uid: string;
    caption: any;
    user_id: any;
    type_id: any;
    media: any;
    background_color: any;
    text_color: any;
    duration: any;
    created_at: any;
    updated_at: any;
    user: Users;
    type: StoryTypes;
}
