"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoriesHttpModule = void 0;
const stories_service_1 = require("../../stories/stories.service");
const users_service_1 = require("../../users/users.service");
const story_types_service_1 = require("../../story-types/story-types.service");
const stories_controller_1 = require("../../stories/stories.controller");
const common_1 = require("@nestjs/common");
const stories_module_1 = require("./stories.module");
const jwt_1 = require("@nestjs/jwt");
const user_stories_service_1 = require("../../user-stories/user-stories.service");
const winston_logger_service_1 = require("../../winston.logger.service");
let StoriesHttpModule = class StoriesHttpModule {
};
StoriesHttpModule = __decorate([
    (0, common_1.Module)({
        imports: [
            stories_module_1.StoriesModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
            })
        ],
        providers: [
            stories_service_1.StoriesService,
            story_types_service_1.StoryTypesService,
            user_stories_service_1.UserStoriesService,
            users_service_1.UsersService,
            winston_logger_service_1.WinstonLoggerService
        ],
        controllers: [stories_controller_1.StoriesController],
    })
], StoriesHttpModule);
exports.StoriesHttpModule = StoriesHttpModule;
//# sourceMappingURL=stories.http.module.js.map