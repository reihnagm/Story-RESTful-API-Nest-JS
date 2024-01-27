import { Controller, Get, Post, Req, Res, Response, Request, Body, UploadedFile, UseInterceptors, Delete, Query, Put, UseGuards, HttpException, Headers } from '@nestjs/common';
import { FormStoreStoriesDto } from '@dto/stories/form.store.dto';
import { UpdateStoriesDto } from '@dto/stories/update.dto';
import { CResponse, JwtDecode, Utils } from '@utils/utils';
import { StoriesService } from '@stories/stories.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Stories } from '@entities/stories.entity';
import { UsersGuard } from '@auth/users.guard';
import { StoryTypesService } from '@story-types/story-types.service';
import { SkipThrottle } from '@nestjs/throttler';
import { StoreStoriesDto } from '@dto/stories/store.dto';
import { UserStoriesService } from 'src/user-stories/user-stories.service';
import { FormUserStoriesDto } from '@dto/user-stories/form.store.dto';
import { StoreUserStoriesDto } from '@dto/user-stories/store.dto';
import { WinstonLoggerService } from 'src/winston.logger.service';
import { UsersService } from '@auth/users.service';

@SkipThrottle()
@Controller()
export class StoriesController {
    constructor(
        private storiesService: StoriesService,
        private storyTypesService: StoryTypesService,
        private userStoriesService: UserStoriesService,
        private users: UsersService,
        private readonly logger: WinstonLoggerService
    ) {}

    @UseGuards(UsersGuard)
    @Get('all')
    async all(
        @Req() _: Request, 
        @Res() res: Response
    ): Promise<void> {
        try {
            let stories = await this.storiesService.findAll();

            let data = [];

            for (let i = 0; i < stories.length; i++) {

                let story = stories[i];

                let storyTypes = await this.storyTypesService.find(story.type_id);

                if(typeof storyTypes == "undefined") 
                    throw new Error("Story Types not found");

                data.push({
                    id: story.uid,
                    caption: story.caption,
                    media: story.media,
                    background_color: story.background_color,
                    text_color: story.text_color,
                    duration: story.duration,
                    type: {
                        id: storyTypes.uid,
                        name: storyTypes.name 
                    },
                    created_at: Utils.formatDateWithSeconds(story.created_at),
                    updated_at: Utils.formatDateWithSeconds(story.updated_at),
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
            let stories = await this.storiesService.find(id);
            
            if(typeof stories == "undefined")
                throw new Error("Stories not found");

            let storyTypes = await this.storyTypesService.find(stories.type_id);

            if(typeof storyTypes == "undefined") 
                throw new Error("Story Types not found");

            let data = {
                id: stories.uid,
                caption: stories.caption,
                media: stories.media,
                background_color: stories.background_color,
                text_color: stories.text_color,
                duration: stories.duration,
                type: {
                    id: storyTypes.uid,
                    type: storyTypes.name
                },
                created_at: Utils.formatDateWithSeconds(stories.created_at),
                updated_at: Utils.formatDateWithSeconds(stories.updated_at)
            };
            
            new CResponse(res, 200, false, "", data);
        } catch(e) {
            this.logger.error(e.message, e.stack);
            new CResponse(res, 400, true, e.message, null);
        }
    }

    @UseGuards(UsersGuard)
    @Post('store') 
    async store(
        @Headers('Authorization') auth: string,
        @Body() data: FormStoreStoriesDto, 
        @Req() _: Request, 
        @Res() res: Response
    ): Promise<void> {
        try {

            const jwt = new JwtDecode(auth);
            const userId = jwt.auth.user_id;

            let stories = new StoreStoriesDto();
            stories.background_color = data.background_color;
            stories.text_color = data.text_color;
            stories.caption = data.caption;
            stories.media = data.media;
            stories.duration = data.duration;
            stories.type_id = data.type_id;
            stories.user_id = userId;

            this.validateStore(data);

            let users = await this.users.find(userId);

            if(typeof users == "undefined") 
                throw new Error("Users not found");

                let storyTypes = await this.storyTypesService.find(data.type_id);

            if(typeof storyTypes == "undefined")
                throw new Error("Story Types not found");

            let storeId = await this.storiesService.store(stories);

            let formUserStories = new FormUserStoriesDto();
            formUserStories.user_id = userId;
            formUserStories.story_id = storeId;

            let userStories = new StoreUserStoriesDto();

            userStories.uid = formUserStories.id;
            userStories.user_id = formUserStories.user_id;
            userStories.story_id = formUserStories.story_id;

            await this.userStoriesService.store(userStories);

            new CResponse(res, 200, false, "", null);
        } catch(e) {
            this.logger.error(e.message, e.stack);
            new CResponse(res, 400, true, e.message, null);
        }
    }

    @UseGuards(UsersGuard)
    @Put('update')
    async update(
        @Body() data: UpdateStoriesDto, 
        @Req() _: Request, 
        @Res() res: Response,
        @Query('id') id: string, 
    ) {
        try {
            const checkStories = await this.storiesService.find(id);
            
            if(typeof checkStories == "undefined")
                throw new Error("Stories not found");

            let updateStories = new UpdateStoriesDto();
            updateStories.caption = data.caption;

            this.validateUpdate(id);

            let stories = new Stories();
            stories.caption = updateStories.caption;

            await this.storiesService.update(id, stories);
            
            new CResponse(res, 200, false, "", null);
        } catch(e) {
            this.logger.error(e.message, e.stack);
            new CResponse(res, 400, true, e.message, null);
        }
    }
 
    @UseGuards(UsersGuard)
    @Delete('delete')
    async delete(
        @Req() _: Request, 
        @Res() res: Response, 
        @Query('id') uid: string
    ) {
        try {
            const stories = await this.storiesService.find(uid);
            
            if(typeof stories == "undefined") {
                throw new Error('Stories not found');

            } else {
                await this.storiesService.destroy(uid);

                new CResponse(res, 200, false, "", null);
            }
        } catch(e) {
            this.logger.error(e.message, e.stack);
            new CResponse(res, 400, true, e.message, null);
        }
    }

    validateStore(data: FormStoreStoriesDto) {
        if(data.background_color == "" || data.background_color == "undefined")
           throw new Error(`background_color is required`);
        if(data.text_color == "" || typeof data.text_color == "undefined")
            throw new Error(`text_color is required`);
        if(data.caption == "" || typeof data.caption == "undefined") 
            throw new Error(`caption is required`);
        if(data.media == "" || typeof data.media == "undefined") 
            throw new Error(`media is required`);
        if(data.duration == "" || typeof data.duration == "undefined")
            throw new Error(`duration is required`);
        if(data.type_id == "" || typeof data.type_id == "undefined")
            throw new Error(`type_id is required`);
    }

    validateUpdate(id: string) {
        if(id == "" || typeof id == "undefined")
            throw new Error(`id is required`);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file',
        {
            storage: diskStorage({
                destination: './public',
                filename: Utils.customFilename,
            }),
        }
    ))

    uploadFile(@UploadedFile() file: Express.Multer.File) { };
}
