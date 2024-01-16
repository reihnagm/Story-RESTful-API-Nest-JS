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
const uuid_1 = require("uuid");
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
let StoriesController = class StoriesController {
    constructor(storiesService, storyTypesService, userStoriesService) {
        this.storiesService = storiesService;
        this.storyTypesService = storyTypesService;
        this.userStoriesService = userStoriesService;
    }
    async all(_, res) {
        try {
            const stories = await this.storiesService.findAll();
            let data = [];
            for (let i = 0; i < stories.length; i++) {
                const story = stories[i];
                const storyTypes = await this.storyTypesService.find(story.type);
                data.push({
                    id: story.uid,
                    caption: story.caption,
                    media: story.media,
                    background_color: story.background_color,
                    text_color: story.text_color,
                    type: {
                        id: typeof storyTypes == "undefined" ? '-' : storyTypes.uid,
                        type: typeof storyTypes == "undefined" ? '-' : storyTypes.type
                    },
                    created_at: utils_1.Utils.formatDateWithSeconds(story.created_at),
                    updated_at: utils_1.Utils.formatDateWithSeconds(story.updated_at),
                });
            }
            new utils_1.ResponseOk(res, 200, false, "", data);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 400);
        }
    }
    async single(_, res, uid) {
        try {
            const stories = await this.storiesService.find(uid);
            if (typeof stories == "undefined")
                throw new common_1.HttpException("Data not found", 400);
            const storyTypes = await this.storyTypesService.find(stories.type);
            let data = {
                id: stories.uid,
                caption: stories.caption,
                media: stories.media,
                background_color: stories.background_color,
                text_color: stories.text_color,
                type: {
                    id: typeof storyTypes == "undefined" ? '-' : storyTypes.uid,
                    type: typeof storyTypes == "undefined" ? '-' : storyTypes.type
                },
                created_at: utils_1.Utils.formatDateWithSeconds(stories.created_at),
                updated_at: utils_1.Utils.formatDateWithSeconds(stories.updated_at)
            };
            new utils_1.ResponseOk(res, 200, false, "", data);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 400);
        }
    }
    async store(data, _, res) {
        try {
            let formStories = new form_store_dto_1.FormStoreStoriesDto();
            formStories.id = (0, uuid_1.v4)();
            formStories.background_color = data.background_color;
            formStories.text_color = data.text_color;
            formStories.caption = data.caption;
            formStories.media = data.media;
            formStories.duration = data.duration;
            formStories.type = data.type;
            formStories.user_id = data.user_id;
            let stories = new store_dto_1.StoreStoriesDto();
            stories.uid = formStories.id;
            stories.background_color = formStories.background_color;
            stories.text_color = formStories.text_color;
            stories.caption = formStories.caption;
            stories.media = formStories.media;
            stories.duration = formStories.duration;
            stories.type = formStories.type;
            stories.user_id = formStories.user_id;
            this.validateStore(formStories);
            var storyTypes = await this.storyTypesService.find(formStories.type);
            if (typeof storyTypes == "undefined") {
                throw new common_1.HttpException("story_types not found", 400);
            }
            let formUserStories = new form_store_dto_2.FormUserStoriesDto();
            formUserStories.id = (0, uuid_1.v4)();
            formUserStories.user_id = stories.user_id;
            formUserStories.story_id = stories.uid;
            let userStories = new store_dto_2.StoreUserStoriesDto();
            userStories.uid = formUserStories.id;
            userStories.user_id = formUserStories.user_id;
            userStories.story_id = formUserStories.story_id;
            await this.userStoriesService.store(userStories);
            await this.storiesService.store(stories);
            new utils_1.ResponseOk(res, 200, false, "", null);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 400);
        }
    }
    async update(data, _, res, id) {
        try {
            let updateStories = new update_dto_1.UpdateStoriesDto();
            updateStories.caption = data.caption;
            updateStories.type = data.type;
            updateStories.background_color = data.background_color;
            this.validateUpdate(id);
            let stories = new stories_entity_1.Stories();
            stories.caption = updateStories.caption;
            stories.type = updateStories.type;
            stories.background_color = updateStories.background_color;
            await this.storiesService.update(id, stories);
            new utils_1.ResponseOk(res, 200, false, "", null);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 400);
        }
    }
    async delete(_, res, uid) {
        try {
            const stories = await this.storiesService.find(uid);
            if (typeof stories == "undefined") {
                throw new common_1.HttpException('Data not found', 400);
            }
            else {
                await this.storiesService.destroy(uid);
                new utils_1.ResponseOk(res, 200, false, "", null);
            }
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 400);
        }
    }
    validateStore(data) {
        if (data.background_color == '')
            throw new Error(`background_color is required`);
        if (data.text_color == '')
            throw new Error(`text_color is required`);
        if (data.caption == '')
            throw new Error(`caption is required`);
        if (data.media == '')
            throw new Error(`media is required`);
        if (data.duration == '')
            throw new Error(`duration is required`);
        if (data.type == '')
            throw new Error(`type is required`);
        if (data.user_id == '')
            throw new Error(`user_id is required`);
    }
    validateUpdate(id) {
        if (id == '')
            throw new Error(`id is required`);
    }
    uploadFile(file) { }
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
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [form_store_dto_1.FormStoreStoriesDto, Object, Object]),
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
        user_stories_service_1.UserStoriesService])
], StoriesController);
exports.StoriesController = StoriesController;
//# sourceMappingURL=stories.controller.js.map