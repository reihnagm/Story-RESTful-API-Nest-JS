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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const bcrypt = require("bcrypt");
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const register_dto_1 = require("../dto/users/register-dto");
const login_dto_1 = require("../dto/users/login-dto");
const users_service_1 = require("./users.service");
const jwt_1 = require("@nestjs/jwt");
let UsersController = class UsersController {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async login(_, res, data) {
        try {
            let auth = new login_dto_1.LoginDto();
            auth.phone = data.phone;
            auth.password = data.password;
            let errors = await (0, class_validator_1.validate)(auth);
            if (errors.length > 0) {
                return utils_1.Utils.response(res, 400, true, "", errors[0].constraints);
            }
            else {
                let login = await this.usersService.login(auth);
                if (typeof login == "undefined") {
                    throw new common_1.HttpException('Phone / Password is incorrect', 400);
                }
                else {
                    let isMatch = await bcrypt.compare(auth.password, login.password);
                    if (isMatch) {
                        const payload = {
                            sub: login.uid
                        };
                        return utils_1.Utils.response(res, 200, false, "", {
                            token: await this.jwtService.signAsync(payload),
                            user: {
                                id: login.uid,
                                email: login.email,
                                phone: login.phone,
                                created_at: login.created_at,
                                updated_at: login.updated_at
                            },
                        });
                    }
                    else {
                        throw new common_1.HttpException('Phone / Password is incorrect', 400);
                    }
                }
            }
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 400);
        }
    }
    async register(_, res, data) {
        try {
            let auth = new register_dto_1.RegisterDto();
            auth.uid = (0, uuid_1.v4)();
            auth.phone = data.phone;
            auth.email = data.email;
            auth.password = data.password;
            auth.password = await bcrypt.hash(auth.password, 10);
            let errors = await (0, class_validator_1.validate)(auth);
            if (errors.length > 0) {
                throw new common_1.HttpException(errors[0].constraints, 400);
            }
            else {
                let isUserExists = await this.usersService.isUserExists(auth);
                if (isUserExists == null) {
                    await this.usersService.register(auth);
                    return utils_1.Utils.response(res, 200, false, "", {
                        id: auth.uid,
                        email: auth.email,
                        phone: auth.phone,
                        createdAt: auth.created_at,
                        updatedAt: auth.updated_at
                    });
                }
                else {
                    throw new common_1.HttpException('User already exists', 400);
                }
            }
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 400);
        }
    }
};
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof common_1.Request !== "undefined" && common_1.Request) === "function" ? _b : Object, typeof (_c = typeof common_1.Response !== "undefined" && common_1.Response) === "function" ? _c : Object, login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof common_1.Request !== "undefined" && common_1.Request) === "function" ? _d : Object, typeof (_e = typeof common_1.Response !== "undefined" && common_1.Response) === "function" ? _e : Object, register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
UsersController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [users_service_1.UsersService, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map