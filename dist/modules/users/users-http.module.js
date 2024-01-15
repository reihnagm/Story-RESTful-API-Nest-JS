"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersHttpModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../users/users.service");
const users_controller_1 = require("../../users/users.controller");
const users_module_1 = require("./users.module");
const jwt_1 = require("@nestjs/jwt");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
let UsersHttpModule = class UsersHttpModule {
};
UsersHttpModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            throttler_1.ThrottlerModule.forRoot({
                ttl: 60,
                limit: 5
            }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET
            })
        ],
        providers: [
            users_service_1.UsersService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard
            }
        ],
        controllers: [users_controller_1.UsersController]
    })
], UsersHttpModule);
exports.UsersHttpModule = UsersHttpModule;
//# sourceMappingURL=users-http.module.js.map