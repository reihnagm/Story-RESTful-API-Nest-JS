import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm/repository/Repository";
import { Users } from "@entities/auth.entity";
import { LoginDto } from "@dto/auth/login-dto";
import { RegisterDto } from "@dto/auth/register-dto";

export class AuthService {
    constructor(
        @InjectRepository(Users)
        private authRepository: Repository<Users>,
    ) {}

    async login(data: LoginDto) : Promise<Users> { 
        try {
            return await this.authRepository
            .createQueryBuilder("user")
            .select("user.uid, user.phone, user.password, user.email, user.created_at, user.updated_at")
            .where("user.phone = :phone", { phone: data.phone })
            .getRawOne();
        } catch(e) {
            console.log(e);
        }
    }

    async register(data: RegisterDto) : Promise<Users> {
        try {
            return await this.authRepository.save(data);  
        } catch(e) {
            console.log(e);
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
            console.log(e);
        }
    }
}