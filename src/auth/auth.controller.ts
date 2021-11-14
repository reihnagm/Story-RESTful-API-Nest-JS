import { Controller, Post, Req, Res, Response, Request, Body, UploadedFile, UseInterceptors, Delete, Param, Query, Put } from '@nestjs/common';
import { validate } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { Utils } from '@utils/utils';
import { RegisterDto } from '@dto/register-dto';
import { LoginDto } from '@dto/login-dto';
import { AuthService } from '@auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response, @Body() data: LoginDto): Promise<void> {
    try {
      let auth = new LoginDto()
      auth.phone = data.phone;
      auth.password = data.password;
      validate(auth).then(async errors => {
        if(errors.length > 0) {
          return Utils.response(res, 400, true, "", errors[0].constraints);
        } else {
          let login = await this.authService.login(auth);
          if(typeof login == "undefined") {
            return Utils.response(res, 400, true, "Phone / Password is invalid", null);
          } else {
            let isMatch = await bcrypt.compare(auth.password, login.password);
            if(isMatch) {
              return Utils.response(res, 200, false, "", auth);
            } else {
              return Utils.response(res, 400, true, "Phone / Password is invalid", null);
            }
          }
        }
      });
    } catch(e) {
      console.log(e);
    }
  }

  @Post('register') 
  async register(@Req() req: Request, @Res() res: Response, @Body() data: RegisterDto): Promise<void> {
    try {    
      let auth = new RegisterDto();
      auth.uid = v4();
      auth.displayName = data.displayName;
      auth.phone = data.phone;
      auth.email = data.email;
      auth.password = data.password;
      auth.password = await bcrypt.hash(auth.password, 10);
      validate(auth).then(async errors => {
        if (errors.length > 0) {
          return Utils.response(res, 400, true, "", errors[0].constraints);
        } else {
          let c = await this.authService.isUserExists(auth);
          if(c == null) {
            await this.authService.register(auth);
            return Utils.response(res, 200, false, "", {
              uid: auth.uid,
              displayName: auth.displayName,
              email: auth.email,
              phone: auth.phone,
              createdAt: auth.createdAt,
              updatedAt: auth.updatedAt
            });
          } else {
            return Utils.response(res, 400, true, "User already exists", null);
          }
        }
      });
    } catch(e) {
      console.log(e);
    }
  }
}
