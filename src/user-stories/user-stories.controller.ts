import { Controller, Get, Post, Req, Res, Response, Request, Body, UploadedFile, UseInterceptors, Delete, Query, Put, UseGuards, HttpException } from '@nestjs/common';
import { UpdateStoriesDto } from '@dto/stories/update.dto';
import { ResponseOk } from '@utils/utils';
import { UsersGuard } from '@auth/users.guard';
import { SkipThrottle } from '@nestjs/throttler';
import { FormUserStoriesDto } from '@dto/user-stories/form.store.dto';
import { UserStoriesService } from './user-stories.service';

@SkipThrottle()
@Controller()
export class UserStoriesController {
    constructor(
        private userStoriesService: UserStoriesService,
    ) {}

    @UseGuards(UsersGuard)
    @Get('all')
    async all(
        @Req() _: Request, 
        @Res() res: Response
    ): Promise<void> {
        try {

            const userStories = await this.userStoriesService.findAll()

            new ResponseOk(res, 200, false, "", []);
        } catch(_) {
            new HttpException('Internal Server Error', 400);
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
            new ResponseOk(res, 200, false, "", null);
        } catch(_) {
            new HttpException('Internal Server Error', 400);
        }
    }

    @UseGuards(UsersGuard)
    @Post('store') 
    async store(
        @Body() data: FormUserStoriesDto, 
        @Req() _: Request, 
        @Res() res: Response
    ): Promise<void> {
        try {
            new ResponseOk(res, 200, false, "", null);
        } catch(e) {
            new HttpException(e.message, 400);
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
            new ResponseOk(res, 200, false, "", null);
        } catch(e) {
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
            new ResponseOk(res, 200, false, "", null);
        } catch(e) {
            new HttpException(e.message, 400);
        }
    }
}
