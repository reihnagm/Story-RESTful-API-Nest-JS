import { Controller, Get, Post, Req, Res, Response, Request, Body, UploadedFile, UseInterceptors, Delete, Query, Put, UseGuards, HttpException } from '@nestjs/common';
import { v4 } from 'uuid';
import { StoreStoryContentDto } from '@dto/story-content/store.dto';
import { UpdateStoryContentDto } from '@dto/story-content/update.dto';
import { Utils } from '@utils/utils';
import { StoryContentService } from '@story/story-content.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { StoryContents } from '@entities/story_content.entity';
import { AuthGuard } from '@auth/auth.guard';
import { SkipThrottle } from '@nestjs/throttler';
import { StoryContentTypeService } from '@story-type/story-content-type.service';

@SkipThrottle()
@Controller('story-content/v1')
export class StoryContentController {
    constructor(
        private storyContentService: StoryContentService,
        private storyContentTypeService: StoryContentTypeService
    ) {}

    @UseGuards(AuthGuard)
    @Get('all')
    async all(
        @Req() _: Request, 
        @Res() res: Response
    ): Promise<void> {
        try {
            const all = await this.storyContentService.findAll();
            let data = [];
            for (let i = 0; i < all.length; i++) {
                const storyContentType = await this.storyContentTypeService.find(all[i].uid_content_type);
                data.push({
                    id: all[i].uid,
                    content: all[i].content,
                    background_color: all[i].background_color,
                    is_background_color: all[i].is_background_color == 0 ? false : true,
                    type: {
                        uid: storyContentType == null ? '-' : storyContentType.uid,
                        type: storyContentType == null ? '-' : storyContentType.type 
                    },
                    created_at: Utils.formatDate(all[i].created_at),
                    updated_at: Utils.formatDate(all[i].updated_at),
                });
            }
            Utils.response(res, 200, false, "", data);
        } catch(_) {
            throw new HttpException('Internal Server Error', 400);
        }
    }

    @UseGuards(AuthGuard)
    @Get('single')
    async single(
        @Req() _: Request, 
        @Res() res: Response,
        @Query('id') uid: string
    )  {
        try {
            const single = await this.storyContentService.find(uid);
            if(typeof single == 'undefined')
                throw new HttpException('Data not found', 400);

            const singleStoryContentType = await this.storyContentTypeService.find(single.uid_content_type);

            let data = {
                id: single.uid,
                content: single.content,
                background_color: single.background_color,
                is_background_color: single.is_background_color == 0 ? false : true,
                type: {
                    uid: singleStoryContentType == null ? '-' : singleStoryContentType.uid,
                    type: singleStoryContentType == null ? '-' : singleStoryContentType.type
                },
                created_at: Utils.formatDate(single.created_at),
                updated_at: Utils.formatDate(single.updated_at)
            };
            
            Utils.response(res, 200, false, "", data);
        } catch(_) {
            throw new HttpException('Internal Server Error', 400);
        }
    }

    @UseGuards(AuthGuard)
    @Post('store') 
    async store(
        @Body() data: StoreStoryContentDto, 
        @Req() _: Request, 
        @Res() res: Response
    ): Promise<void> {
        try {
            let story = new StoreStoryContentDto();
            story.uid = v4();
            story.content = data.content;
            story.content_type = data.content_type;
            story.background_color = data.background_color;
            story.is_background_color = data.is_background_color == true ? '1' : '0';
        
            this.validateStore(story);

            await this.storyContentService.store(story);

            Utils.response(res, 200, false, "", null);
        
        } catch(e) {
            throw new HttpException(e.message, 400);
        }
    }

    @UseGuards(AuthGuard)
    @Put('update')
    async update(
        @Body() data: UpdateStoryContentDto, 
        @Req() _: Request, 
        @Res() res: Response,
        @Query('id') uid: string, 
    ) {
        try {
            let story = new UpdateStoryContentDto();
            story.content = data.content;
            story.content_type = data.content_type;
            story.background_color = data.background_color;
            story.is_background_color = data.is_background_color;

            this.validateUpdate(story);

            let storyContents = new StoryContents();
            storyContents.content = story.content;
            storyContents.uid_content_type = story.content_type;
            storyContents.background_color = story.background_color;
            storyContents.is_background_color = story.is_background_color;

            await this.storyContentService.update(uid, storyContents);
            
            Utils.response(res, 200, false, "", null);
        } catch(e) {
            throw new HttpException(e.message, 400);
        }
    }
 
    @UseGuards(AuthGuard)
    @Delete('delete')
    async delete(
        @Req() _: Request, 
        @Res() res: Response, 
        @Query('id') uid: string
    ) {
        try {
            const single = await this.storyContentService.find(uid);
            if(typeof single == "undefined") {
                throw new HttpException('Data not found', 400);
            } else {
                await this.storyContentService.destroy(uid);
                Utils.response(res, 200, false, "", null);
            }
        } catch(e) {
            throw new HttpException(e.message, 400);
        }
    }

    validateStore(data: StoreStoryContentDto) {
        if(data.content == '') 
            throw new Error(`content is required`)
        if(data.content_type == '')
            throw new Error(`uid_content_type is required`)
        if(data.background_color == '')
            throw new Error(`background_color is required`)
        if(data.is_background_color == '')
            throw new Error(`is_background_error is required`)
    }

    validateUpdate(data: UpdateStoryContentDto) {
        if(data.content == '') 
            throw new Error(`content is required`)
        if(data.content_type == '')
            throw new Error(`uid_content_type is required`)
        if(data.background_color == '')
            throw new Error(`background_color is required`)
        if(data.is_background_color == '')
            throw new Error(`is_background_error is required`)
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
