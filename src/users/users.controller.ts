import { Controller, Post, Req, Res, Response, Request, Body, HttpException } from '@nestjs/common';
import { validate } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { ResponseOk } from '@utils/utils';
import { RegisterDto } from '@dto/users/register-dto';
import { LoginDto } from '@dto/users/login-dto';
import { UsersService } from '@auth/users.service';
import { JwtService } from '@nestjs/jwt';
import { WinstonLoggerService } from 'src/winston.logger.service';

@Controller()
export class UsersController {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private readonly logger: WinstonLoggerService
    ) {}

    @Post('login')
    async login(
        @Req() _: Request, 
        @Res() res: Response, 
        @Body() data: LoginDto
    ): Promise<void> {
        try {
            let auth = new LoginDto();
            
            auth.phone = data.phone;
            auth.password = data.password;

            let errors = await validate(auth);
            if(errors.length > 0) {
                throw new HttpException(errors[0].constraints, 400);
            } else {
                let login = await this.usersService.login(auth);
                if(typeof login == "undefined") {
                    throw new HttpException('Phone / Password is incorrect', 400);
                } else {
                    let isMatch = await bcrypt.compare(
                        auth.password, 
                        login.password
                    );
                    if(isMatch) {
                        const payload = { 
                            sub: login.uid
                        };
                        new ResponseOk(res, 200, false, "", {
                            token: await this.jwtService.signAsync(payload),
                            user: {
                                id: login.uid,
                                email: login.email,
                                phone: login.phone,
                                created_at: login.created_at,
                                updated_at: login.updated_at
                            },
                        })
                    } else {
                        throw new HttpException('Phone / Password is incorrect', 400);
                    }
                }
            }
        } catch(e) {
            this.logger.error(e.message, e.stack);
            throw new HttpException(e.message, 400);
        }
    }

    @Post('register') 
    async register(
        @Req() _: Request, 
        @Res() res: Response,
        @Body() data: RegisterDto
    ): Promise<void> {
        try {    
            let auth = new RegisterDto();
            
            auth.uid = v4();
            auth.phone = data.phone;
            auth.email = data.email;
            auth.password = data.password;
            auth.password = await bcrypt.hash(auth.password, 10);
            
            let errors = await validate(auth);
            if (errors.length > 0) {
                throw new HttpException(errors[0].constraints, 400);
            } else {
                let isUserExist = await this.usersService.isUserExists(auth);
                if(isUserExist == null) {
                    await this.usersService.register(auth);
                    new ResponseOk(res, 200, false, "", {
                        id: auth.uid,
                        email: auth.email,
                        phone: auth.phone,
                        createdAt: auth.created_at,
                        updatedAt: auth.updated_at
                    });
                } else {
                    throw new HttpException('User already exist', 400);
                }
            }
        } catch(e) {
            this.logger.error(e.message, e.stack);
            throw new HttpException(e.message, 400);
        }
    }
}
