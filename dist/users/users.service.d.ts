import { Repository } from "typeorm/repository/Repository";
import { Users } from "@entities/users.entity";
import { LoginDto } from "@dto/users/login-dto";
import { RegisterDto } from "@dto/users/register-dto";
import { WinstonLoggerService } from "src/winston.logger.service";
export declare class UsersService {
    private authRepository;
    private readonly logger;
    constructor(authRepository: Repository<Users>, logger: WinstonLoggerService);
    login(data: LoginDto): Promise<Users>;
    register(data: RegisterDto): Promise<Users>;
    isUserExists(data: RegisterDto): Promise<Users>;
}
