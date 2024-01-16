import { Controller, Get, Post, Req, Res, Response, Request, Body,  Delete, Query, Put, UseGuards, HttpException } from '@nestjs/common';
import { v4 } from 'uuid';
import { ResponseOk, Utils } from '@utils/utils';
import { StoryTypesService } from '@story-types/story-types.service';
import { UsersGuard } from '@auth/users.guard';
import { StoreStoryTypesDto } from '@dto/story-types/store.dto';
import { UpdateStoryTypesDto } from '@dto/story-types/update.dto';
import { StoryTypes } from '@entities/story_types.entity';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller()
export class StoryTypesController {
  constructor(private storyTypesService: StoryTypesService) {}

  @UseGuards(UsersGuard)
  @Get('all')
  async all(
    @Req() _: Request, 
    @Res() res: Response 
  ): Promise<void> {
    try {

      const storyTypes = await this.storyTypesService.findAll();
      
      let data = [];
      
      for (let i = 0; i < storyTypes.length; i++) {
        var storyType = storyTypes[i];

        data.push({
          id: storyType.uid,
          type: storyType.type,
          created_at: Utils.formatDateWithSeconds(storyType.created_at),
          updated_at: Utils.formatDateWithSeconds(storyType.updated_at),
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
      const storyTypes = await this.storyTypesService.find(uid);
      if(typeof storyTypes == 'undefined')
          throw new HttpException('Data not found', 400);

      let data = {
        id: storyTypes.uid,
        type: storyTypes.type,
        created_at: Utils.formatDate(storyTypes.created_at),
        updated_at: Utils.formatDate(storyTypes.updated_at),
      };
        
      new ResponseOk(res, 200, false, "", data);
    } catch(_) {
      throw new HttpException('Internal Server Error', 400);
    }
  }

  @UseGuards(UsersGuard)
  @Post('store') 
  async store(
    @Body() data: StoreStoryTypesDto, 
    @Req() _: Request, 
    @Res() res: Response
  ): Promise<void> {
    try {
      let storyTypes = new StoreStoryTypesDto();
      storyTypes.uid = v4();
      storyTypes.type = data.type;
  
      await this.storyTypesService.store(storyTypes);

      new ResponseOk(res, 200, false, "", null);
    } catch(e) {
      throw new HttpException(e.message, 400);
    }
  }

  @UseGuards(UsersGuard)
  @Put('update')
  async update(
    @Body() data: UpdateStoryTypesDto, 
    @Req() _: Request, 
    @Res() res: Response,
    @Query('id') uid: string, 
  ) {
    try {
      let updateStoryTypes = new UpdateStoryTypesDto();
      updateStoryTypes.type = data.type;

      let storyTypes = new StoryTypes();
      storyTypes.type = updateStoryTypes.type;

      await this.storyTypesService.update(uid, storyTypes);
      
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
      const storyTypes = await this.storyTypesService.find(uid);
      if(typeof storyTypes == "undefined") {
        throw new HttpException('Data not found', 400);
      } else {
        await this.storyTypesService.destroy(uid);
        new ResponseOk(res, 200, false, "", null);
      }
    } catch(e) {
      throw new HttpException(e.message, 400);
    }
  }

}