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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const bcrypt = require("bcrypt");
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const register_dto_1 = require("../dto/register-dto");
const login_dto_1 = require("../dto/login-dto");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(req, res, data) {
        try {
            let auth = new login_dto_1.LoginDto();
            auth.phone = data.phone;
            auth.password = data.password;
            (0, class_validator_1.validate)(auth).then(async (errors) => {
                if (errors.length > 0) {
                    return utils_1.Utils.response(res, 400, true, "", errors[0].constraints);
                }
                else {
                    let login = await this.authService.login(auth);
                    if (typeof login == "undefined") {
                        return utils_1.Utils.response(res, 400, true, "Phone / Password is invalid", null);
                    }
                    else {
                        let isMatch = await bcrypt.compare(auth.password, login.password);
                        if (isMatch) {
                            return utils_1.Utils.response(res, 200, false, "", auth);
                        }
                        else {
                            return utils_1.Utils.response(res, 400, true, "Phone / Password is invalid", null);
                        }
                    }
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    async register(req, res, data) {
        try {
            let auth = new register_dto_1.RegisterDto();
            auth.uid = (0, uuid_1.v4)();
            auth.displayName = data.displayName;
            auth.phone = data.phone;
            auth.email = data.email;
            auth.password = data.password;
            auth.password = await bcrypt.hash(auth.password, 10);
            (0, class_validator_1.validate)(auth).then(async (errors) => {
                if (errors.length > 0) {
                    return utils_1.Utils.response(res, 400, true, "", errors[0].constraints);
                }
                else {
                    let c = await this.authService.isUserExists(auth);
                    console.log(c);
                    if (c == null) {
                        await this.authService.register(auth);
                        return utils_1.Utils.response(res, 200, false, "", {
                            uid: auth.uid,
                            displayName: auth.displayName,
                            email: auth.email,
                            phone: auth.phone,
                            createdAt: auth.createdAt,
                            updatedAt: auth.updatedAt
                        });
                    }
                    else {
                        return utils_1.Utils.response(res, 400, true, "User already exists", null);
                    }
                }
            });
        }
        catch (e) {
            console.log(e);
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
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map