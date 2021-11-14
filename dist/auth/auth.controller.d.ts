import { RegisterDto } from '@dto/register-dto';
import { LoginDto } from '@dto/login-dto';
import { AuthService } from '@auth/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: Request, res: Response, data: LoginDto): Promise<void>;
    register(req: Request, res: Response, data: RegisterDto): Promise<void>;
}
