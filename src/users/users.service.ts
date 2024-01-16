import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm/repository/Repository";
import { Users } from "@entities/users.entity";
import { LoginDto } from "@dto/users/login-dto";
import { RegisterDto } from "@dto/users/register-dto";
import { WinstonLoggerService } from "src/winston.logger.service";

export class UsersService {
    constructor(
        @InjectRepository(Users)
        private authRepository: Repository<Users>,
        private readonly logger: WinstonLoggerService
    ) {}

    async login(data: LoginDto) : Promise<Users> { 
        try {
            return await this.authRepository
            .createQueryBuilder("user")
            .select("user.uid, user.phone, user.password, user.email, user.created_at, user.updated_at")
            .where("user.phone = :phone", { phone: data.phone })
            .getRawOne();
        } catch(e) {
            this.logger.error(e.message, e.stack);
        }
    }

    async register(data: RegisterDto) : Promise<Users> {
        try {
            return await this.authRepository.save(data);  
        } catch(e) {
            this.logger.error(e.message, e.stack);
        }
    }

    async isUserExists(data: RegisterDto) : Promise<Users> {
        try {
            return await this.authRepository
            .createQueryBuilder("user")
            .select("user.email, user.phone")
            .where("user.email = :email", { 
                email: data.email
            })
            .orWhere("user.phone = :phone", {
                phone: data.phone
            })
            .getRawOne();
        } catch(e) {
            this.logger.error(e.message, e.stack);
        }
    }
}