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
exports.UserStoriesController = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../utils/utils");
const users_guard_1 = require("../users/users.guard");
const throttler_1 = require("@nestjs/throttler");
const user_stories_service_1 = require("./user-stories.service");
const stories_service_1 = require("../stories/stories.service");
const story_types_service_1 = require("../story-types/story-types.service");
const winston_logger_service_1 = require("../winston.logger.service");
let UserStoriesController = class UserStoriesController {
    constructor(userStoriesService, stories, storiesTypes, logger) {
        this.userStoriesService = userStoriesService;
        this.stories = stories;
        this.storiesTypes = storiesTypes;
        this.logger = logger;
    }
    async all(_, res) {
        try {
            let userStories = await this.userStoriesService.findAll();
            let data = [];
            for (let i in userStories) {
                let userStory = userStories[i];
                let id = userStory['uid'];
                let email = userStory['email'];
                let phone = userStory['phone'];
                let storyId = userStory['story_id'];
                let dataStories = [];
                if (storyId.includes(',')) {
                    let storiesId = storyId.split(',');
                    for (let z in storiesId) {
                        let storyIdScope = storiesId[z];
                        let stories = await this.stories.find(storyIdScope);
                        let storyTypes = await this.storiesTypes.find(stories.type_id);
                        if (typeof storyTypes == "undefined")
                            throw new Error("Story Types not found");
                        dataStories.push({
                            id: stories.uid,
                            caption: stories.caption,
                            media: stories.media,
                            background_color: stories.background_color,
                            text_color: stories.text_color,
                            duration: stories.duration,
                            type: {
                                id: storyTypes.uid,
                                name: storyTypes.name
                            },
                            created_at: utils_1.Utils.formatDateWithSeconds(stories.created_at),
                            updated_at: utils_1.Utils.formatDateWithSeconds(stories.updated_at)
                        });
                    }
                }
                else {
                    let stories = await this.stories.find(storyId);
                    let storyTypes = await this.storiesTypes.find(stories.type_id);
                    if (typeof storyTypes == "undefined")
                        throw new Error("Story Types not found");
                    dataStories = [
                        {
                            id: stories.uid,
                            caption: stories.caption,
                            media: stories.media,
                            background_color: stories.background_color,
                            text_color: stories.text_color,
                            duration: stories.duration,
                            type: {
                                id: storyTypes.uid,
                                name: storyTypes.name
                            },
                            created_at: utils_1.Utils.formatDateWithSeconds(stories.created_at),
                            updated_at: utils_1.Utils.formatDateWithSeconds(stories.updated_at)
                        }
                    ];
                }
                data.push({
                    user: {
                        id: id,
                        email: email,
                        phone: phone,
                    },
                    stories: dataStories,
                });
            }
            new utils_1.CResponse(res, 200, false, "", data);
        }
        catch (e) {
            this.logger.error(e.message, e.stack);
            new utils_1.CResponse(res, 400, true, e.message, null);
        }
    }
    async single(_, res, id) {
        try {
            let userStories = await this.userStoriesService.findAllById(id);
            let data = [];
            for (let i in userStories) {
                let userStory = userStories[i];
                let id = userStory['uid'];
                let email = userStory['email'];
                let phone = userStory['phone'];
                let storyId = userStory['story_id'];
                let dataStories = [];
                if (storyId.includes(',')) {
                    let storiesId = storyId.split(',');
                    for (let z in storiesId) {
                        let storyIdScope = storiesId[z];
                        let stories = await this.stories.find(storyIdScope);
                        let storyTypes = await this.storiesTypes.find(stories.type_id);
                        if (typeof storyTypes == "undefined")
                            throw new Error("Story Types not found");
                        dataStories.push({
                            id: stories.uid,
                            caption: stories.caption,
                            media: stories.media,
                            background_color: stories.background_color,
                            text_color: stories.text_color,
                            duration: stories.duration,
                            type: {
                                id: storyTypes.uid,
                                name: storyTypes.name
                            },
                            created_at: utils_1.Utils.formatDateWithSeconds(stories.created_at),
                            updated_at: utils_1.Utils.formatDateWithSeconds(stories.updated_at)
                        });
                    }
                }
                else {
                    let stories = await this.stories.find(storyId);
                    let storyTypes = await this.storiesTypes.find(stories.type_id);
                    if (typeof storyTypes == "undefined")
                        throw new Error("Story Types not found");
                    dataStories = [
                        {
                            id: stories.uid,
                            caption: stories.caption,
                            media: stories.media,
                            background_color: stories.background_color,
                            text_color: stories.text_color,
                            duration: stories.duration,
                            type: {
                                id: storyTypes.uid,
                                name: storyTypes.name
                            },
                            created_at: utils_1.Utils.formatDateWithSeconds(stories.created_at),
                            updated_at: utils_1.Utils.formatDateWithSeconds(stories.updated_at)
                        }
                    ];
                }
                data.push({
                    user: {
                        id: id,
                        email: email,
                        phone: phone,
                    },
                    stories: dataStories,
                });
            }
            new utils_1.CResponse(res, 200, false, "", data);
        }
        catch (e) {
            this.logger.error(e.message, e.stack);
            new utils_1.CResponse(res, 400, true, e.message, null);
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(users_guard_1.UsersGuard),
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserStoriesController.prototype, "all", null);
__decorate([
    (0, common_1.UseGuards)(users_guard_1.UsersGuard),
    (0, common_1.Get)('single'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], UserStoriesController.prototype, "single", null);
UserStoriesController = __decorate([
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [user_stories_service_1.UserStoriesService,
        stories_service_1.StoriesService,
        story_types_service_1.StoryTypesService,
        winston_logger_service_1.WinstonLoggerService])
], UserStoriesController);
exports.UserStoriesController = UserStoriesController;
//# sourceMappingURL=user-stories.controller.js.map