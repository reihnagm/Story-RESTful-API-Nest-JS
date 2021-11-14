import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm/repository/Repository";
import { Auth } from "@entities/auth.entity";
import { LoginDto } from "@dto/login-dto";
import { RegisterDto } from "@dto/register-dto";

export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

  async login(data: LoginDto) : Promise<Auth> { 
    try {
    return await this.authRepository
      .createQueryBuilder("a")
      .select("a.uid, a.phone, a.password, a.displayName, a.email, a.createdAt, a.updatedAt")
      .where("a.phone = :phone", { phone: data.phone })
      .getRawOne();
    } catch(e) {
      console.log(e);
    }
  }

  async register(data: RegisterDto) : Promise<Auth> {
    try {
      return await this.authRepository.save(data);  
    } catch(e) {
      console.log(e);
    }
  }

  async isUserExists(data: RegisterDto) : Promise<Auth> {
    try {
      return await this.authRepository
      .createQueryBuilder("a")
      .select("a.email, a.phone")
      .where("a.email = :email", { 
        email: data.email
      })
      .orWhere("a.phone = :phone", {
        phone: data.phone
      })
      .getRawOne();
    } catch(e) {
      console.log(e);
    }
  }
}