import { RegisterDto } from '@dto/auth/register-dto';
import { LoginDto } from '@dto/auth/login-dto';
import { AuthService } from '@auth/auth.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private authService;
    private jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    login(_: Request, res: Response, data: LoginDto): Promise<void>;
    register(_: Request, res: Response, data: RegisterDto): Promise<void>;
}
