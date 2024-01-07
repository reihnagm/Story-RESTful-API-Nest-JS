import { Controller, Post, Req, Res, Response, Request, Body, HttpException } from '@nestjs/common';
import { validate } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { Utils } from '@utils/utils';
import { RegisterDto } from '@dto/auth/register-dto';
import { LoginDto } from '@dto/auth/login-dto';
import { AuthService } from '@auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('auth/v1')
export class AuthController {
    constructor(
        private authService: AuthService,
        private jwtService: JwtService,
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
                return Utils.response(res, 400, true, "", errors[0].constraints);
            } else {
                let login = await this.authService.login(auth);
                if(typeof login == "undefined") {
                    throw new HttpException('Phone / Password is incorrect', 400);
                } else {
                    let isMatch = await bcrypt.compare(auth.password, login.password);
                    if(isMatch) {
                        const payload = { 
                            sub: login.uid
                        };
                        return Utils.response(res, 200, false, "", {
                            access_token: await this.jwtService.signAsync(payload),
                            user: {
                                id: login.id,
                                uid: login.uid,
                                email: login.email,
                                phone: login.phone,
                                created_at: login.created_at,
                                updated_at: login.updated_at
                            },
                        });
                    } else {
                        throw new HttpException('Phone / Password is incorrect', 400);
                    }
                }
            }
        } catch(e) {
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
                let isUserExists = await this.authService.isUserExists(auth);
                if(isUserExists == null) {
                    await this.authService.register(auth);
                    return Utils.response(res, 200, false, "", {
                        uid: auth.uid,
                        email: auth.email,
                        phone: auth.phone,
                        createdAt: auth.created_at,
                        updatedAt: auth.updated_at
                    });
                } else {
                    throw new HttpException('User already exists', 400);
                }
            }
        } catch(e) {
            throw new HttpException(e.message, 400);
        }
    }
}
