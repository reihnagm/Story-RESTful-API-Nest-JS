import { RegisterDto } from '@dto/users/register-dto';
import { LoginDto } from '@dto/users/login-dto';
import { UsersService } from '@auth/users.service';
import { JwtService } from '@nestjs/jwt';
import { WinstonLoggerService } from 'src/winston.logger.service';
export declare class UsersController {
    private usersService;
    private jwtService;
    private readonly logger;
    constructor(usersService: UsersService, jwtService: JwtService, logger: WinstonLoggerService);
    login(_: Request, res: Response, data: LoginDto): Promise<void>;
    register(_: Request, res: Response, data: RegisterDto): Promise<void>;
}
