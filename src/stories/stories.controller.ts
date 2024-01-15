import { Controller, Get, Post, Req, Res, Response, Request, Body, UploadedFile, UseInterceptors, Delete, Query, Put, UseGuards, HttpException } from '@nestjs/common';
import { v4 } from 'uuid';
import { StoreStoriesDto } from '@dto/stories/store.dto';
import { UpdateStoriesDto } from '@dto/stories/update.dto';
import { Utils } from '@utils/utils';
import { StoriesService } from '@stories/stories.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Stories } from '@entities/stories.entity';
import { UsersGuard } from '@auth/users.guard';
import { StoryTypesService } from '@story-types/story-types.service';

@Controller()
export class StoriesController {
    constructor(
        private storiesService: StoriesService,
        private storyTypesService: StoryTypesService
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
                const storyTypes = await this.storyTypesService.find(stories[i].type);
                data.push({
                    id: stories[i].uid,
                    caption: stories[i].caption,
                    background_color: stories[i].background_color,
                    type: {
                        uid: storyTypes == null ? '-' : storyTypes.uid,
                        type: storyTypes == null ? '-' : storyTypes.type 
                    },
                    created_at: Utils.formatDate(stories[i].created_at),
                    updated_at: Utils.formatDate(stories[i].updated_at),
                });
            }
            Utils.response(res, 200, false, "", data);
        } catch(_) {
            throw new HttpException('Internal Server Error', 400);
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
            if(typeof stories == 'undefined')
                throw new HttpException('Data not found', 400);

            const storyTypes = await this.storyTypesService.find(stories.type);

            let data = {
                id: stories.uid,
                caption: stories.caption,
                background_color: stories.background_color,
                type: {
                    uid: storyTypes == null ? '-' : storyTypes.uid,
                    type: storyTypes == null ? '-' : storyTypes.type
                },
                created_at: Utils.formatDate(stories.created_at),
                updated_at: Utils.formatDate(stories.updated_at)
            };
            
            Utils.response(res, 200, false, "", data);
        } catch(_) {
            throw new HttpException('Internal Server Error', 400);
        }
    }

    @UseGuards(UsersGuard)
    @Post('store') 
    async store(
        @Body() data: StoreStoriesDto, 
        @Req() _: Request, 
        @Res() res: Response
    ): Promise<void> {
        try {
            let stories = new StoreStoriesDto();
            stories.uid = v4();
            stories.caption = data.caption;
            stories.type = data.type;
            stories.background_color = data.background_color;
        
            this.validateStore(stories);

            await this.storiesService.store(stories);

            Utils.response(res, 200, false, "", null);
        
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
        @Query('id') uid: string, 
    ) {
        try {
            let updateStories = new UpdateStoriesDto();
            updateStories.caption = data.caption;
            updateStories.type = data.type;
            updateStories.background_color = data.background_color;

            this.validateUpdate(updateStories);

            let stories = new Stories();
            stories.caption = stories.caption;
            stories.type = stories.type;
            stories.background_color = stories.background_color;

            await this.storiesService.update(uid, stories);
            
            Utils.response(res, 200, false, "", null);
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
                Utils.response(res, 200, false, "", null);
            }
        } catch(e) {
            throw new HttpException(e.message, 400);
        }
    }

    validateStore(data: StoreStoriesDto) {
        if(data.caption == '') 
            throw new Error(`caption is required`)
        if(data.type == '')
            throw new Error(`type is required`)
        if(data.background_color == '')
            throw new Error(`background_color is required`)
    }

    validateUpdate(data: UpdateStoriesDto) {
        if(data.caption == '') 
            throw new Error(`caption is required`)
        if(data.type == '')
            throw new Error(`type is required`)
        if(data.background_color == '')
            throw new Error(`background_color is required`)
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

    uploadFile(@UploadedFile() file: Express.Multer.File) {

    }
}
