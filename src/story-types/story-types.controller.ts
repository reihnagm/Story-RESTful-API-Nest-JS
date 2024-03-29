import { Controller, Get, Post, Req, 
  Res, Response, Request, Body, Delete, 
  Query, Put, UseGuards, HttpException 
} from '@nestjs/common';
import { CResponse, Utils } from '@utils/utils';
import { StoryTypesService } from '@story-types/story-types.service';
import { UsersGuard } from '@auth/users.guard';
import { StoreStoryTypesDto } from '@dto/story-types/store.dto';
import { UpdateStoryTypesDto } from '@dto/story-types/update.dto';
import { StoryTypes } from '@entities/story_types.entity';
import { SkipThrottle } from '@nestjs/throttler';
import { WinstonLoggerService } from 'src/winston.logger.service';

@SkipThrottle()
@Controller()
export class StoryTypesController {
  constructor(
    private storyTypesService: StoryTypesService,
    private readonly logger: WinstonLoggerService  
  ) {}

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
          id: storyType.id,
          type: storyType.name,
          created_at: Utils.formatDateWithSeconds(storyType.created_at),
          updated_at: Utils.formatDateWithSeconds(storyType.updated_at),
        });
      }

      new CResponse(res, 200, false, "", data);
    } catch(e) {
      this.logger.error(e.message, e.stack);
      new HttpException(e.message, 400);
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

      if(typeof storyTypes == "undefined")
        new HttpException("Data not found", 400);

      let data = {
        id: storyTypes.uid,
        type: storyTypes.name,
        created_at: Utils.formatDate(storyTypes.created_at),
        updated_at: Utils.formatDate(storyTypes.updated_at),
      };
        
      new CResponse(res, 200, false, "", data);
    } catch(e) {
      this.logger.error(e.message, e.stack);
      new HttpException(e.message, 400);
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

      storyTypes.name = data.name;
  
      await this.storyTypesService.store(storyTypes);

      new CResponse(res, 200, false, "", null);
    } catch(e) {
      this.logger.error(e.message, e.stack);
      new HttpException(e.message, 400);
    }
  }

  @UseGuards(UsersGuard)
  @Put('update')
  async update(
    @Body() data: UpdateStoryTypesDto, 
    @Req() _: Request, 
    @Res() res: Response,
    @Query('id') id: string, 
  ) {
    try {
      let checkStoryTypes = await this.storyTypesService.find(id);

      if(typeof checkStoryTypes == "undefined")
        new HttpException("Data not found", 400);

      let updateStoryTypes = new UpdateStoryTypesDto();
      updateStoryTypes.name = data.name;

      let storyTypes = new StoryTypes();
      storyTypes.name = updateStoryTypes.name;

      await this.storyTypesService.update(id, storyTypes);
      
      new CResponse(res, 200, false, "", null);
    } catch(e) {
      this.logger.error(e.message, e.stack);
      new HttpException(e.message, 400);
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

      if(typeof storyTypes == "undefined")
        new HttpException("Data not found", 400);
  
      await this.storyTypesService.destroy(uid);

      new CResponse(res, 200, false, "", null);
    } catch(e) {
      this.logger.error(e.message, e.stack);
      new HttpException(e.message, 400);
    }
  }

}