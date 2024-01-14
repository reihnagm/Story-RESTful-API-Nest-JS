import { Controller, Get, Post, Req, Res, Response, Request, Body,  Delete, Query, Put, UseGuards, HttpException } from '@nestjs/common';
import { v4 } from 'uuid';
import { Utils } from '@utils/utils';
import { StoryContentTypeService } from '@story-type/story-content-type.service';
import { AuthGuard } from '@auth/auth.guard';
import { SkipThrottle } from '@nestjs/throttler';
import { StoreStoryContentTypeDto } from '@dto/story-content-type/store.dto';
import { UpdateStoryContentTypeDto } from '@dto/story-content-type/update.dto';
import { StoryContentTypes } from '@entities/story_content_type.entity';

@SkipThrottle()
@Controller('story-content-type/v1')
export class StoryContentTypeController {
  constructor(private storyContentTypeService: StoryContentTypeService) {}

  @UseGuards(AuthGuard)
  @Get('all')
  async all(
    @Req() _: Request, 
    @Res() res: Response 
  ): Promise<void> {
    try {
      const all = await this.storyContentTypeService.findAll();
      let data = [];
      for (let i = 0; i < all.length; i++) {
        data.push({
          id: all[i].uid,
          type: all[i].type,
          created_at: Utils.formatDate(all[i].created_at),
          updated_at: Utils.formatDate(all[i].updated_at),
        });
      }
      return Utils.response(res, 200, false, "", data);
    } catch(e) {
      throw new HttpException(e.message, 400);
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
          const single = await this.storyContentTypeService.find(uid);
          if(typeof single == 'undefined')
              throw new HttpException('Data not found', 400);

          let data = {
            id: single.uid,
            type: single.type,
            created_at: Utils.formatDate(single.created_at),
            updated_at: Utils.formatDate(single.updated_at),
          };
          
          Utils.response(res, 200, false, "", data);
      } catch(_) {
          throw new HttpException('Internal Server Error', 400);
      }
  }

  @UseGuards(AuthGuard)
  @Post('store') 
  async store(
    @Body() data: StoreStoryContentTypeDto, 
    @Req() _: Request, 
    @Res() res: Response
  ): Promise<void> {
    try {
      let story = new StoreStoryContentTypeDto();
      story.uid = v4();
      story.type = data.type;
  
      await this.storyContentTypeService.store(story);

      Utils.response(res, 200, false, "", null);
    } catch(e) {
      throw new HttpException(e.message, 400);
    }
  }

  @UseGuards(AuthGuard)
  @Put('update')
  async update(
      @Body() data: UpdateStoryContentTypeDto, 
      @Req() _: Request, 
      @Res() res: Response,
      @Query('id') uid: string, 
  ) {
    try {
      let story = new UpdateStoryContentTypeDto();
      story.type = data.type;

      let storyContentsTypes = new StoryContentTypes();
      storyContentsTypes.type = story.type;

      await this.storyContentTypeService.update(uid, storyContentsTypes);
      
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
      const single = await this.storyContentTypeService.find(uid);
      if(typeof single == "undefined") {
        throw new HttpException('Data not found', 400);
      } else {
        await this.storyContentTypeService.destroy(uid);
        Utils.response(res, 200, false, "", null);
      }
    } catch(e) {
      throw new HttpException(e.message, 400);
    }
  }


}
