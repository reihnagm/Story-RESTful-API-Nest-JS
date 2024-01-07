import { Repository } from "typeorm/repository/Repository";
import { Users } from "@entities/auth.entity";
import { LoginDto } from "@dto/auth/login-dto";
import { RegisterDto } from "@dto/auth/register-dto";
export declare class AuthService {
    private authRepository;
    constructor(authRepository: Repository<Users>);
    login(data: LoginDto): Promise<Users>;
    register(data: RegisterDto): Promise<Users>;
    isUserExists(data: RegisterDto): Promise<Users>;
}
