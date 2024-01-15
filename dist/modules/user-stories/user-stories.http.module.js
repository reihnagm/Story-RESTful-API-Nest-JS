"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStoriesHttpModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_stories_service_1 = require("../../user-stories/user-stories.service");
const user_stories_module_1 = require("./user-stories.module");
const user_stories_controller_1 = require("../../user-stories/user-stories.controller");
let UserStoriesHttpModule = class UserStoriesHttpModule {
};
UserStoriesHttpModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_stories_module_1.UserStoriesModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
            })
        ],
        providers: [
            user_stories_service_1.UserStoriesService,
        ],
        controllers: [user_stories_controller_1.UserStoriesController]
    })
], UserStoriesHttpModule);
exports.UserStoriesHttpModule = UserStoriesHttpModule;
//# sourceMappingURL=user-stories.http.module.js.map