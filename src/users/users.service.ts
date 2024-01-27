import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm/repository/Repository";
import { Users } from "@entities/users.entity";
import { LoginDto } from "@dto/users/login-dto";
import { RegisterDto } from "@dto/users/register-dto";
import { WinstonLoggerService } from "src/winston.logger.service";
import { Param } from "@nestjs/common";

export class UsersService {
    constructor(
        @InjectRepository(Users)
        private authRepository: Repository<Users>,
        private readonly logger: WinstonLoggerService
    ) {}

    async login(data: LoginDto) : Promise<Users> { 
        try {
            return await this.authRepository
            .createQueryBuilder("u")
            .select("u.uid, u.phone, u.password, u.email, u.created_at, u.updated_at")
            .where("u.phone = :phone", { 
                phone: data.val 
            })
            .orWhere("u.email = :email", {
                email: data.val
            })
            .getRawOne();
        } catch(e) {
            this.logger.error(e.message, e.stack);
        }
    }

    async find(@Param('uid') uid: string) : Promise<Users> {
        try {
            return await this.authRepository
            .createQueryBuilder("u")
            .select("u.uid")
            .where("uid = :uid", { uid: uid })
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