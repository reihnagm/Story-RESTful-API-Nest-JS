import { Repository } from "typeorm/repository/Repository";
import { Auth } from "@entities/auth.entity";
import { LoginDto } from "@dto/login-dto";
import { RegisterDto } from "@dto/register-dto";
export declare class AuthService {
    private authRepository;
    constructor(authRepository: Repository<Auth>);
    login(data: LoginDto): Promise<Auth>;
    register(data: RegisterDto): Promise<Auth>;
    isUserExists(data: RegisterDto): Promise<Auth>;
}
