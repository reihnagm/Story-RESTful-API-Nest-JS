"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const Repository_1 = require("typeorm/repository/Repository");
const auth_entity_1 = require("../entities/auth.entity");
let AuthService = class AuthService {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async login(data) {
        try {
            return await this.authRepository
                .createQueryBuilder("user")
                .select("user.uid, user.phone, user.password, user.email, user.created_at, user.updated_at")
                .where("user.phone = :phone", { phone: data.phone })
                .getRawOne();
        }
        catch (e) {
            console.log(e);
        }
    }
    async register(data) {
        try {
            return await this.authRepository.save(data);
        }
        catch (e) {
            console.log(e);
        }
    }
    async isUserExists(data) {
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
        }
        catch (e) {
            console.log(e);
        }
    }
};
AuthService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(auth_entity_1.Users)),
    __metadata("design:paramtypes", [Repository_1.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map