import { Repository } from "typeorm/repository/Repository";
import { Users } from "@entities/users.entity";
import { LoginDto } from "@dto/users/login-dto";
import { RegisterDto } from "@dto/users/register-dto";
export declare class UsersService {
    private authRepository;
    constructor(authRepository: Repository<Users>);
    login(data: LoginDto): Promise<Users>;
    register(data: RegisterDto): Promise<Users>;
    isUserExists(data: RegisterDto): Promise<Users>;
}
