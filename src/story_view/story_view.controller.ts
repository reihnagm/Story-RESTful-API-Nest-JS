import { Controller, Get, Post, Req, Res, Response, Request, Body, UploadedFile, UseInterceptors, Delete, Param, Query, Put } from '@nestjs/common';
import { validate } from 'class-validator';
import { v4 } from 'uuid';
import { StoreStoryViewDto } from '@dto/store-story-view.dto';
import { UpdateStoryViewDto } from '@dto/update-story-view.dto';
import { Utils } from '@utils/utils';
import { StoryViewService } from '@story/story_view.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { StoryViewContent } from '@entities/story_view_content.entity';

export const editFileName = (req: any, file: { originalname: string; }, callback: (arg0: any, arg1: string) => void) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

@Controller('story-view')
export class StoryViewController {
  constructor(private readonly storyViewService: StoryViewService) {}

  @Get('all')
  async all(@Req() req: Request, @Res() res: Response, @Query('uid') uid: string): Promise<void> {
    if(uid) {
      const s = await this.storyViewService.findStoryViewContent(uid);
      const b = await this.storyViewService.findAllStoryContentType(s.uid_content_type);
      return Utils.response(res, 200, false, "", {
        uid: s.uid,
        content: s.content,
        backgroundColor: s.backgroundColor,
        isBackgroundColor: s.isBackgroundColor == 0 ? false : true,
        type: {
          uid: b.uid,
          type: b.type
        },
        createdAt: s.createdAt,
        updatedAt: s.updatedAt
      });
    } else {  
      try {
        const a = await this.storyViewService.findAllStoryViewContent();
        let data = [];
        for (let i = 0; i < a.length; i++) {
          const b = await this.storyViewService.findAllStoryContentType(a[i].uid_content_type);
          data.push({
            uid: a[i].uid,
            content: a[i].content,
            backgroundColor: a[i].backgroundColor,
            isBackgroundColor: a[i].isBackgroundColor == 0 ? false : true,
            type: {
              uid: b.uid,
              type: b.type 
            },
            createdAt: a[i].createdAt,
            updatedAt: a[i].updatedAt,
          });
        }
        return Utils.response(res, 200, false, "", data);
      } catch(e) {
        console.log(e);
      }
    }
  }

  @Post('store') 
  async store(@Body() data: StoreStoryViewDto, @Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      let story = new StoreStoryViewDto();
      story.uid = v4();
      story.content = data.content;
      story.uid_content_type = data.uid_content_type;
      story.backgroundColor = data.backgroundColor;
      story.isBackgroundColor = data.isBackgroundColor;
      validate(story).then(async errors => {
        if (errors.length > 0) {
          return Utils.response(res, 400, true, "", errors[0].constraints);
        } else {
          await this.storyViewService.storeStoryViewContent(story)
          return Utils.response(res, 200, false, "", story);
        }
      });
    } catch(e) {
      console.log(e);
    }
  }

  @Put('update')
  async update(@Body() data: UpdateStoryViewDto, @Query('uid') uid: string,  @Req() req: Request, @Res() res: Response) {
    try {
      let story = new UpdateStoryViewDto();
      story.content = data.content;
      story.uid_content_type = data.uid_content_type;
      story.backgroundColor = data.backgroundColor;
      story.isBackgroundColor = data.isBackgroundColor;
      validate(story).then(async errors => {
        if (errors.length > 0) {
          return Utils.response(res, 400, true, "", errors[0].constraints);
        } else {
          let s = new StoryViewContent();
          s.content = story.content;
          s.uid_content_type = story.uid_content_type;
          s.backgroundColor = story.backgroundColor;
          s.isBackgroundColor = story.isBackgroundColor;
          await this.storyViewService.update(uid, s);
          return Utils.response(res, 200, false, "", null);
        }
      });
    } catch(e) {
      console.log(e);
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: './public/assets/media',
        filename: editFileName,
      }),
    }
  ))

  uploadFile(@UploadedFile() file: Express.Multer.File) {

  }
 
  @Delete('destroy')
  async deleteStoryViewContent(@Req() req: Request, @Res() res: Response,  @Query('uid') uid: string) {
    try {
      const a = await this.storyViewService.findStoryViewContent(uid);
      if(typeof a == "undefined") {
        this.storyViewService.destroyStoryViewContent(uid);
        return Utils.response(res, 400, true, "data not found", null);
      } else {
        this.storyViewService.destroyStoryViewContent(uid);
        return Utils.response(res, 200, false, "", null);
      }
    } catch(e) {
      console.log(e);
    }
  }
}
