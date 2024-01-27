import { Controller, Post, Req, Res, Response, Request, Body, HttpException } from '@nestjs/common';
import { validate } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { CResponse, Utils } from '@utils/utils';
import { RegisterDto } from '@dto/users/register-dto';
import { LoginDto } from '@dto/users/login-dto';
import { UsersService } from '@auth/users.service';
import { JwtService } from '@nestjs/jwt';
import { WinstonLoggerService } from 'src/winston.logger.service';
import { util } from 'prettier';

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
            
            auth.val = data.val;
            auth.password = data.password;

            let errors = await validate(auth);

            if(errors.length > 0) {
                throw new Error(errors[0].constraints.message);
            } else {
                let login = await this.usersService.login(auth);
                if(typeof login == "undefined") {
                    throw new Error('Account is incorrect');
                } else {
                    let isMatch = await bcrypt.compare(
                        auth.password, 
                        login.password
                    );
                    if(isMatch) {
                        const payload = { 
                            user_id: login.uid
                        };
                        new CResponse(res, 200, false, "", {
                            token: await this.jwtService.signAsync(payload),
                            user: {
                                id: login.uid,
                                email: login.email,
                                phone: login.phone,
                                created_at: Utils.formatDateWithSeconds(login.created_at),
                                updated_at: Utils.formatDateWithSeconds(login.updated_at)
                            },
                        })
                    } else {
                        throw new Error('Account is incorrect');
                    }
                }
            }
        } catch(e) {
            this.logger.error(e.message, e.stack);
            new CResponse(res, 400, true ,e.message, null);
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
            
            auth.phone = data.phone;
            auth.email = data.email;
            auth.password = data.password;
            auth.password = await bcrypt.hash(auth.password, 10);
            
            let errors = await validate(auth);

            if (errors.length > 0) {
                throw new Error(errors[0].constraints.message);
            } else {
                let isUserExist = await this.usersService.isUserExists(auth);
                if(isUserExist == null) {
                    await this.usersService.register(auth);
                    
                    new CResponse(res, 200, false, "", {
                        id: auth.uid,
                        email: auth.email,
                        phone: auth.phone,
                        created_at: Utils.formatDateWithSeconds(auth.created_at),
                        updated_at: Utils.formatDateWithSeconds(auth.updated_at)
                    });
                } else {
                    throw new Error('User already exist');
                }
            }
        } catch(e) {
            this.logger.error(e.message, e.stack);
            new CResponse(res, 400, true, e.message, null);
        }
    }
}
