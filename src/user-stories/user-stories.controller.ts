import { Controller, Get, Req, Res, Response, Request, Query, UseGuards, HttpException } from '@nestjs/common';
import { CResponse, Utils } from '@utils/utils';
import { UsersGuard } from '@auth/users.guard';
import { SkipThrottle } from '@nestjs/throttler';
import { UserStoriesService } from './user-stories.service';
import { StoriesService } from '@stories/stories.service';
import { StoryTypesService } from '@story-types/story-types.service';
import { WinstonLoggerService } from 'src/winston.logger.service';

@SkipThrottle()
@Controller()
export class UserStoriesController {
    constructor(
        private userStoriesService: UserStoriesService,
        private stories: StoriesService,
        private storiesTypes: StoryTypesService,
        private readonly logger: WinstonLoggerService
    ) {}

    @UseGuards(UsersGuard)
    @Get('all')
    async all(
        @Req() _: Request, 
        @Res() res: Response
    ): Promise<void> {
        try {
            let userStories = await this.userStoriesService.findAll();

            let data = [];

            for (let i in userStories) {
                let userStory = userStories[i];

                let id = userStory['uid'] as string;
                let email = userStory['email'] as string;
                let phone = userStory['phone'] as string;

                let storyId =  userStory['story_id'] as string;

                let dataStories = [];

                if(storyId.includes(',')) {
                    
                    let storiesId = storyId.split(',');

                    for (let z in storiesId) {
                        let storyIdScope = storiesId[z];

                        let stories = await this.stories.find(storyIdScope)

                        let storyTypes = await this.storiesTypes.find(stories.type_id);

                        if(typeof storyTypes == "undefined") 
                            throw new Error("Story Types not found");

                        dataStories.push({
                            id: stories.uid,
                            caption: stories.caption,
                            media: stories.media,
                            background_color: stories.background_color,
                            text_color: stories.text_color,
                            duration: stories.duration,
                            type: {
                                id: storyTypes.uid,
                                name: storyTypes.name 
                            },
                            created_at: Utils.formatDateWithSeconds(stories.created_at),
                            updated_at: Utils.formatDateWithSeconds(stories.updated_at)
                        }); 
                    }

                } else {

                    let stories = await this.stories.find(storyId)

                    let storyTypes = await this.storiesTypes.find(stories.type_id);

                    if(typeof storyTypes == "undefined") 
                        throw new Error("Story Types not found");

                    dataStories = [
                        {
                            id: stories.uid,
                            caption: stories.caption,
                            media: stories.media,
                            background_color: stories.background_color,
                            text_color: stories.text_color,
                            duration: stories.duration,
                            type: {
                                id: storyTypes.uid,
                                name: storyTypes.name 
                            },
                            created_at: Utils.formatDateWithSeconds(stories.created_at),
                            updated_at: Utils.formatDateWithSeconds(stories.updated_at)
                        }
                    ];

                }

                data.push({
                    user: {
                        id: id,
                        email: email,
                        phone: phone,
                    },
                    stories: dataStories,
                });
            }

            new CResponse(res, 200, false, "", data);
        } catch(e) {
            this.logger.error(e.message, e.stack);
            new CResponse(res, 400, true, e.message, null);
        }
    }

    @UseGuards(UsersGuard)
    @Get('single')
    async single(
        @Req() _: Request, 
        @Res() res: Response,
        @Query('id') id: string
    )  {
        try {

            let userStories = await this.userStoriesService.findAllById(id);

            let data = [];

            for (let i in userStories) {
                let userStory = userStories[i];

                let id = userStory['uid'] as string;
                let email = userStory['email'] as string;
                let phone = userStory['phone'] as string;

                let storyId =  userStory['story_id'] as string;

                let dataStories = [];

                if(storyId.includes(',')) {
                    
                    let storiesId = storyId.split(',');

                    for (let z in storiesId) {
                        let storyIdScope = storiesId[z];

                        let stories = await this.stories.find(storyIdScope)

                        let storyTypes = await this.storiesTypes.find(stories.type_id);

                        if(typeof storyTypes == "undefined") 
                            throw new Error("Story Types not found");

                        dataStories.push({
                            id: stories.uid,
                            caption: stories.caption,
                            media: stories.media,
                            background_color: stories.background_color,
                            text_color: stories.text_color,
                            duration: stories.duration,
                            type: {
                                id: storyTypes.uid,
                                name: storyTypes.name 
                            },
                            created_at: Utils.formatDateWithSeconds(stories.created_at),
                            updated_at: Utils.formatDateWithSeconds(stories.updated_at)
                        }); 
                    }

                } else {

                    let stories = await this.stories.find(storyId)

                    let storyTypes = await this.storiesTypes.find(stories.type_id);

                    if(typeof storyTypes == "undefined") 
                        throw new Error("Story Types not found");

                    dataStories = [
                        {
                            id: stories.uid,
                            caption: stories.caption,
                            media: stories.media,
                            background_color: stories.background_color,
                            text_color: stories.text_color,
                            duration: stories.duration,
                            type: {
                                id: storyTypes.uid,
                                name: storyTypes.name 
                            },
                            created_at: Utils.formatDateWithSeconds(stories.created_at),
                            updated_at: Utils.formatDateWithSeconds(stories.updated_at)
                        }
                    ];

                }

                data.push({
                    user: {
                        id: id,
                        email: email,
                        phone: phone,
                    },
                    stories: dataStories,
                });
            }

            new CResponse(res, 200, false, "", data);
        } catch(e) {
            this.logger.error(e.message, e.stack);
            new CResponse(res, 400, true, e.message, null);
        }
    }

}
