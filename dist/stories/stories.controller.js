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
const store_dto_1 = require("../dto/stories/store.dto");
const update_dto_1 = require("../dto/stories/update.dto");
const utils_1 = require("../utils/utils");
const stories_service_1 = require("./stories.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const stories_entity_1 = require("../entities/stories.entity");
const users_guard_1 = require("../users/users.guard");
const story_types_service_1 = require("../story-types/story-types.service");
let StoriesController = class StoriesController {
    constructor(storiesService, storyTypesService) {
        this.storiesService = storiesService;
        this.storyTypesService = storyTypesService;
    }
    async all(_, res) {
        try {
            const stories = await this.storiesService.findAll();
            let data = [];
            for (let i = 0; i < stories.length; i++) {
                const storyTypes = await this.storyTypesService.find(stories[i].type);
                data.push({
                    id: stories[i].uid,
                    caption: stories[i].caption,
                    background_color: stories[i].background_color,
                    type: {
                        uid: storyTypes == null ? '-' : storyTypes.uid,
                        type: storyTypes == null ? '-' : storyTypes.type
                    },
                    created_at: utils_1.Utils.formatDate(stories[i].created_at),
                    updated_at: utils_1.Utils.formatDate(stories[i].updated_at),
                });
            }
            utils_1.Utils.response(res, 200, false, "", data);
        }
        catch (_) {
            throw new common_1.HttpException('Internal Server Error', 400);
        }
    }
    async single(_, res, uid) {
        try {
            const stories = await this.storiesService.find(uid);
            if (typeof stories == 'undefined')
                throw new common_1.HttpException('Data not found', 400);
            const storyTypes = await this.storyTypesService.find(stories.type);
            let data = {
                id: stories.uid,
                caption: stories.caption,
                background_color: stories.background_color,
                type: {
                    uid: storyTypes == null ? '-' : storyTypes.uid,
                    type: storyTypes == null ? '-' : storyTypes.type
                },
                created_at: utils_1.Utils.formatDate(stories.created_at),
                updated_at: utils_1.Utils.formatDate(stories.updated_at)
            };
            utils_1.Utils.response(res, 200, false, "", data);
        }
        catch (_) {
            throw new common_1.HttpException('Internal Server Error', 400);
        }
    }
    async store(data, _, res) {
        try {
            let stories = new store_dto_1.StoreStoriesDto();
            stories.uid = (0, uuid_1.v4)();
            stories.caption = data.caption;
            stories.type = data.type;
            stories.background_color = data.background_color;
            this.validateStore(stories);
            await this.storiesService.store(stories);
            utils_1.Utils.response(res, 200, false, "", null);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 400);
        }
    }
    async update(data, _, res, uid) {
        try {
            let updateStories = new update_dto_1.UpdateStoriesDto();
            updateStories.caption = data.caption;
            updateStories.type = data.type;
            updateStories.background_color = data.background_color;
            this.validateUpdate(updateStories);
            let stories = new stories_entity_1.Stories();
            stories.caption = stories.caption;
            stories.type = stories.type;
            stories.background_color = stories.background_color;
            await this.storiesService.update(uid, stories);
            utils_1.Utils.response(res, 200, false, "", null);
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
                utils_1.Utils.response(res, 200, false, "", null);
            }
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 400);
        }
    }
    validateStore(data) {
        if (data.caption == '')
            throw new Error(`caption is required`);
        if (data.type == '')
            throw new Error(`type is required`);
        if (data.background_color == '')
            throw new Error(`background_color is required`);
    }
    validateUpdate(data) {
        if (data.caption == '')
            throw new Error(`caption is required`);
        if (data.type == '')
            throw new Error(`type is required`);
        if (data.background_color == '')
            throw new Error(`background_color is required`);
    }
    uploadFile(file) {
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
    __metadata("design:paramtypes", [store_dto_1.StoreStoriesDto, Object, Object]),
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
    (0, common_1.Controller)('stories/v1'),
    __metadata("design:paramtypes", [stories_service_1.StoriesService,
        story_types_service_1.StoryTypesService])
], StoriesController);
exports.StoriesController = StoriesController;
//# sourceMappingURL=stories.controller.js.map