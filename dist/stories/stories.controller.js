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
exports.StoriesController = void 0;
const common_1 = require("@nestjs/common");
const form_store_dto_1 = require("../dto/stories/form.store.dto");
const update_dto_1 = require("../dto/stories/update.dto");
const utils_1 = require("../utils/utils");
const stories_service_1 = require("./stories.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const stories_entity_1 = require("../entities/stories.entity");
const users_guard_1 = require("../users/users.guard");
const story_types_service_1 = require("../story-types/story-types.service");
const throttler_1 = require("@nestjs/throttler");
const store_dto_1 = require("../dto/stories/store.dto");
const user_stories_service_1 = require("../user-stories/user-stories.service");
const form_store_dto_2 = require("../dto/user-stories/form.store.dto");
const store_dto_2 = require("../dto/user-stories/store.dto");
const winston_logger_service_1 = require("../winston.logger.service");
const users_service_1 = require("../users/users.service");
let StoriesController = class StoriesController {
    constructor(storiesService, storyTypesService, userStoriesService, users, logger) {
        this.storiesService = storiesService;
        this.storyTypesService = storyTypesService;
        this.userStoriesService = userStoriesService;
        this.users = users;
        this.logger = logger;
    }
    async all(_, res) {
        try {
            let stories = await this.storiesService.findAll();
            let data = [];
            for (let i = 0; i < stories.length; i++) {
                let story = stories[i];
                let storyTypes = await this.storyTypesService.find(story.type_id);
                if (typeof storyTypes == "undefined")
                    throw new Error("Story Types not found");
                data.push({
                    id: story.uid,
                    caption: story.caption,
                    media: story.media,
                    background_color: story.background_color,
                    text_color: story.text_color,
                    duration: story.duration,
                    type: {
                        id: storyTypes.uid,
                        name: storyTypes.name
                    },
                    created_at: utils_1.Utils.formatDateWithSeconds(story.created_at),
                    updated_at: utils_1.Utils.formatDateWithSeconds(story.updated_at),
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
            let stories = await this.storiesService.find(id);
            if (typeof stories == "undefined")
                throw new Error("Stories not found");
            let storyTypes = await this.storyTypesService.find(stories.type_id);
            if (typeof storyTypes == "undefined")
                throw new Error("Story Types not found");
            let data = {
                id: stories.uid,
                caption: stories.caption,
                media: stories.media,
                background_color: stories.background_color,
                text_color: stories.text_color,
                duration: stories.duration,
                type: {
                    id: storyTypes.uid,
                    type: storyTypes.name
                },
                created_at: utils_1.Utils.formatDateWithSeconds(stories.created_at),
                updated_at: utils_1.Utils.formatDateWithSeconds(stories.updated_at)
            };
            new utils_1.CResponse(res, 200, false, "", data);
        }
        catch (e) {
            this.logger.error(e.message, e.stack);
            new utils_1.CResponse(res, 400, true, e.message, null);
        }
    }
    async store(auth, data, _, res) {
        try {
            const jwt = new utils_1.JwtDecode(auth);
            const userId = jwt.auth.user_id;
            let stories = new store_dto_1.StoreStoriesDto();
            stories.background_color = data.background_color;
            stories.text_color = data.text_color;
            stories.caption = data.caption;
            stories.media = data.media;
            stories.duration = data.duration;
            stories.type_id = data.type_id;
            stories.user_id = userId;
            this.validateStore(data);
            let users = await this.users.find(userId);
            if (typeof users == "undefined")
                throw new Error("Users not found");
            let storyTypes = await this.storyTypesService.find(data.type_id);
            if (typeof storyTypes == "undefined")
                throw new Error("Story Types not found");
            let storeId = await this.storiesService.store(stories);
            let formUserStories = new form_store_dto_2.FormUserStoriesDto();
            formUserStories.user_id = userId;
            formUserStories.story_id = storeId;
            let userStories = new store_dto_2.StoreUserStoriesDto();
            userStories.uid = formUserStories.id;
            userStories.user_id = formUserStories.user_id;
            userStories.story_id = formUserStories.story_id;
            await this.userStoriesService.store(userStories);
            new utils_1.CResponse(res, 200, false, "", null);
        }
        catch (e) {
            this.logger.error(e.message, e.stack);
            new utils_1.CResponse(res, 400, true, e.message, null);
        }
    }
    async update(data, _, res, id) {
        try {
            const checkStories = await this.storiesService.find(id);
            if (typeof checkStories == "undefined")
                throw new Error("Stories not found");
            let updateStories = new update_dto_1.UpdateStoriesDto();
            updateStories.caption = data.caption;
            this.validateUpdate(id);
            let stories = new stories_entity_1.Stories();
            stories.caption = updateStories.caption;
            await this.storiesService.update(id, stories);
            new utils_1.CResponse(res, 200, false, "", null);
        }
        catch (e) {
            this.logger.error(e.message, e.stack);
            new utils_1.CResponse(res, 400, true, e.message, null);
        }
    }
    async delete(_, res, uid) {
        try {
            const stories = await this.storiesService.find(uid);
            if (typeof stories == "undefined") {
                throw new Error('Stories not found');
            }
            else {
                await this.storiesService.destroy(uid);
                new utils_1.CResponse(res, 200, false, "", null);
            }
        }
        catch (e) {
            this.logger.error(e.message, e.stack);
            new utils_1.CResponse(res, 400, true, e.message, null);
        }
    }
    validateStore(data) {
        if (data.background_color == "" || data.background_color == "undefined")
            throw new Error(`background_color is required`);
        if (data.text_color == "" || typeof data.text_color == "undefined")
            throw new Error(`text_color is required`);
        if (data.caption == "" || typeof data.caption == "undefined")
            throw new Error(`caption is required`);
        if (data.media == "" || typeof data.media == "undefined")
            throw new Error(`media is required`);
        if (data.duration == "" || typeof data.duration == "undefined")
            throw new Error(`duration is required`);
        if (data.type_id == "" || typeof data.type_id == "undefined")
            throw new Error(`type_id is required`);
    }
    validateUpdate(id) {
        if (id == "" || typeof id == "undefined")
            throw new Error(`id is required`);
    }
    uploadFile(file) { }
    ;
};
__decorate([
    (0, common_1.UseGuards)(users_guard_1.UsersGuard),
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StoriesController.prototype, "all", null);
__decorate([
    (0, common_1.UseGuards)(users_guard_1.UsersGuard),
    (0, common_1.Get)('single'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], StoriesController.prototype, "single", null);
__decorate([
    (0, common_1.UseGuards)(users_guard_1.UsersGuard),
    (0, common_1.Post)('store'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, form_store_dto_1.FormStoreStoriesDto, Object, Object]),
    __metadata("design:returntype", Promise)
], StoriesController.prototype, "store", null);
__decorate([
    (0, common_1.UseGuards)(users_guard_1.UsersGuard),
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_dto_1.UpdateStoriesDto, Object, Object, String]),
    __metadata("design:returntype", Promise)
], StoriesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(users_guard_1.UsersGuard),
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], StoriesController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './public',
            filename: utils_1.Utils.customFilename,
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StoriesController.prototype, "uploadFile", null);
StoriesController = __decorate([
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [stories_service_1.StoriesService,
        story_types_service_1.StoryTypesService,
        user_stories_service_1.UserStoriesService,
        users_service_1.UsersService,
        winston_logger_service_1.WinstonLoggerService])
], StoriesController);
exports.StoriesController = StoriesController;
//# sourceMappingURL=stories.controller.js.map