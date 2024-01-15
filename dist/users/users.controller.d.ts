import { Response, Request } from '@nestjs/common';
import { RegisterDto } from '@dto/users/register-dto';
import { LoginDto } from '@dto/users/login-dto';
import { UsersService } from '@auth/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class UsersController {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(_: Request, res: Response, data: LoginDto): Promise<void>;
    register(_: Request, res: Response, data: RegisterDto): Promise<void>;
}
