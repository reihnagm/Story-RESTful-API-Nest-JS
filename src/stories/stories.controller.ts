import { Controller, Get, Post, Req, Res, Response, Request, Body, UploadedFile, UseInterceptors, Delete, Query, Put, UseGuards, HttpException } from '@nestjs/common';
import { v4 } from 'uuid';
import { FormStoreStoriesDto } from '@dto/stories/form.store.dto';
import { UpdateStoriesDto } from '@dto/stories/update.dto';
import { ResponseOk, Utils } from '@utils/utils';
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

@SkipThrottle()
@Controller()
export class StoriesController {
    constructor(
        private storiesService: StoriesService,
        private storyTypesService: StoryTypesService,
        private userStoriesService: UserStoriesService
    ) {}

    @UseGuards(UsersGuard)
    @Get('all')
    async all(
        @Req() _: Request, 
        @Res() res: Response
    ): Promise<void> {
        try {
            const stories = await this.storiesService.findAll();

            let data = [];

            for (let i = 0; i < stories.length; i++) {

                const story = stories[i];

                const storyTypes = await this.storyTypesService.find(story.type);

                data.push({
                    id: story.uid,
                    caption: story.caption,
                    media: story.media,
                    background_color: story.background_color,
                    text_color: story.text_color,
                    type: {
                        id: typeof storyTypes == "undefined" ? '-' : storyTypes.uid,
                        type: typeof storyTypes == "undefined" ? '-' : storyTypes.type 
                    },
                    created_at: Utils.formatDateWithSeconds(story.created_at),
                    updated_at: Utils.formatDateWithSeconds(story.updated_at),
                });
            }

            new ResponseOk(res, 200, false, "", data);
        } catch(e) {
            throw new HttpException(e.message, 400);
        }
    }

    @UseGuards(UsersGuard)
    @Get('single')
    async single(
        @Req() _: Request, 
        @Res() res: Response,
        @Query('id') uid: string
    )  {
        try {
            const stories = await this.storiesService.find(uid);
            
            if(typeof stories == "undefined")
                throw new HttpException("Data not found", 400);

            const storyTypes = await this.storyTypesService.find(stories.type);

            let data = {
                id: stories.uid,
                caption: stories.caption,
                media: stories.media,
                background_color: stories.background_color,
                text_color: stories.text_color,
                type: {
                    id: typeof storyTypes == "undefined" ? '-' : storyTypes.uid,
                    type: typeof storyTypes == "undefined" ? '-' : storyTypes.type
                },
                created_at: Utils.formatDateWithSeconds(stories.created_at),
                updated_at: Utils.formatDateWithSeconds(stories.updated_at)
            };
            
            new ResponseOk(res, 200, false, "", data);
        } catch(e) {
            throw new HttpException(e.message, 400);
        }
    }

    @UseGuards(UsersGuard)
    @Post('store') 
    async store(
        @Body() data: FormStoreStoriesDto, 
        @Req() _: Request, 
        @Res() res: Response
    ): Promise<void> {
        try {
            let formStories = new FormStoreStoriesDto();

            formStories.id = v4();
            formStories.background_color = data.background_color;
            formStories.text_color = data.text_color;
            formStories.caption = data.caption;
            formStories.media = data.media;
            formStories.duration = data.duration;
            formStories.type = data.type;
            formStories.user_id = data.user_id;

            let stories = new StoreStoriesDto();
            stories.uid = formStories.id;
            stories.background_color = formStories.background_color;
            stories.text_color = formStories.text_color;
            stories.caption = formStories.caption;
            stories.media = formStories.media;
            stories.duration = formStories.duration;
            stories.type = formStories.type;
            stories.user_id = formStories.user_id;

            this.validateStore(formStories);

            var storyTypes = await this.storyTypesService.find(formStories.type);

            if(typeof storyTypes == "undefined") {
                throw new HttpException("Data not found", 400);
            }

            let formUserStories = new FormUserStoriesDto();
            formUserStories.id = v4();
            formUserStories.user_id = stories.user_id;
            formUserStories.story_id = stories.uid;

            let userStories = new StoreUserStoriesDto();
            userStories.uid = formUserStories.id;
            userStories.user_id = formUserStories.user_id;
            userStories.story_id = formUserStories.story_id;

            await this.userStoriesService.store(userStories)

            await this.storiesService.store(stories);

            new ResponseOk(res, 200, false, "", null);
        } catch(e) {
            throw new HttpException(e.message, 400);
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
                throw new HttpException('Data not found', 400);

            let updateStories = new UpdateStoriesDto();
            updateStories.caption = data.caption;

            this.validateUpdate(id);

            let stories = new Stories();
            stories.caption = updateStories.caption;

            await this.storiesService.update(id, stories);
            
            new ResponseOk(res, 200, false, "", null);
        } catch(e) {
            throw new HttpException(e.message, 400);
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
                throw new HttpException('Data not found', 400);

            } else {
                await this.storiesService.destroy(uid);

                new ResponseOk(res, 200, false, "", null);
            }
        } catch(e) {
            throw new HttpException(e.message, 400);
        }
    }

    validateStore(data: FormStoreStoriesDto) {
        if(data.background_color == '')
            throw new Error(`background_color is required`)
        if(data.text_color == '')
            throw new Error(`text_color is required`)
        if(data.caption == '') 
            throw new Error(`caption is required`)
        if(data.media == '') 
            throw new Error(`media is required`)
        if(data.duration == '')
            throw new Error(`duration is required`)
        if(data.type == '')
            throw new Error(`type is required`)
        if(data.user_id == '')
            throw new Error(`user_id is required`)
    }

    validateUpdate(id: string) {
        if(id == '')
            throw new Error(`id is required`)
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

    uploadFile(@UploadedFile() file: Express.Multer.File) { }
}
