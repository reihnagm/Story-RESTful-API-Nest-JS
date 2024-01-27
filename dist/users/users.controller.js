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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const bcrypt = require("bcrypt");
const utils_1 = require("../utils/utils");
const register_dto_1 = require("../dto/users/register-dto");
const login_dto_1 = require("../dto/users/login-dto");
const users_service_1 = require("./users.service");
const jwt_1 = require("@nestjs/jwt");
const winston_logger_service_1 = require("../winston.logger.service");
let UsersController = class UsersController {
    constructor(usersService, jwtService, logger) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.logger = logger;
    }
    async login(_, res, data) {
        try {
            let auth = new login_dto_1.LoginDto();
            auth.val = data.val;
            auth.password = data.password;
            let errors = await (0, class_validator_1.validate)(auth);
            if (errors.length > 0) {
                throw new Error(errors[0].constraints.message);
            }
            else {
                let login = await this.usersService.login(auth);
                if (typeof login == "undefined") {
                    throw new Error('Account is incorrect');
                }
                else {
                    let isMatch = await bcrypt.compare(auth.password, login.password);
                    if (isMatch) {
                        const payload = {
                            user_id: login.uid
                        };
                        new utils_1.CResponse(res, 200, false, "", {
                            token: await this.jwtService.signAsync(payload),
                            user: {
                                id: login.uid,
                                email: login.email,
                                phone: login.phone,
                                created_at: utils_1.Utils.formatDateWithSeconds(login.created_at),
                                updated_at: utils_1.Utils.formatDateWithSeconds(login.updated_at)
                            },
                        });
                    }
                    else {
                        throw new Error('Account is incorrect');
                    }
                }
            }
        }
        catch (e) {
            this.logger.error(e.message, e.stack);
            new utils_1.CResponse(res, 400, true, e.message, null);
        }
    }
    async register(_, res, data) {
        try {
            let auth = new register_dto_1.RegisterDto();
            auth.phone = data.phone;
            auth.email = data.email;
            auth.password = data.password;
            auth.password = await bcrypt.hash(auth.password, 10);
            let errors = await (0, class_validator_1.validate)(auth);
            if (errors.length > 0) {
                throw new Error(errors[0].constraints.message);
            }
            else {
                let isUserExist = await this.usersService.isUserExists(auth);
                if (isUserExist == null) {
                    await this.usersService.register(auth);
                    new utils_1.CResponse(res, 200, false, "", {
                        id: auth.uid,
                        email: auth.email,
                        phone: auth.phone,
                        created_at: utils_1.Utils.formatDateWithSeconds(auth.created_at),
                        updated_at: utils_1.Utils.formatDateWithSeconds(auth.updated_at)
                    });
                }
                else {
                    throw new Error('User already exist');
                }
            }
        }
        catch (e) {
            this.logger.error(e.message, e.stack);
            new utils_1.CResponse(res, 400, true, e.message, null);
        }
    }
};
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
UsersController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        winston_logger_service_1.WinstonLoggerService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map