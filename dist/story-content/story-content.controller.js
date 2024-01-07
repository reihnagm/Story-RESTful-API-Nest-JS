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
exports.StoryContentController = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const store_dto_1 = require("../dto/story-content/store.dto");
const update_dto_1 = require("../dto/story-content/update.dto");
const utils_1 = require("../utils/utils");
const story_content_service_1 = require("./story-content.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const story_content_entity_1 = require("../entities/story_content.entity");
const auth_guard_1 = require("../auth/auth.guard");
const throttler_1 = require("@nestjs/throttler");
const story_content_type_service_1 = require("../story-content-type/story-content-type.service");
let StoryContentController = class StoryContentController {
    constructor(storyContentService, storyContentTypeService) {
        this.storyContentService = storyContentService;
        this.storyContentTypeService = storyContentTypeService;
    }
    async all(_, res) {
        try {
            const all = await this.storyContentService.findAll();
            let data = [];
            for (let i = 0; i < all.length; i++) {
                const storyContentType = await this.storyContentTypeService.find(all[i].uid_content_type);
                data.push({
                    id: all[i].uid,
                    content: all[i].content,
                    background_color: all[i].background_color,
                    is_background_color: all[i].is_background_color == 0 ? false : true,
                    type: {
                        uid: storyContentType == null ? '-' : storyContentType.uid,
                        type: storyContentType == null ? '-' : storyContentType.type
                    },
                    created_at: utils_1.Utils.formatDate(all[i].created_at),
                    updated_at: utils_1.Utils.formatDate(all[i].updated_at),
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
            const single = await this.storyContentService.find(uid);
            if (typeof single == 'undefined')
                throw new common_1.HttpException('Data not found', 400);
            const singleStoryContentType = await this.storyContentTypeService.find(single.uid_content_type);
            let data = {
                id: single.uid,
                content: single.content,
                background_color: single.background_color,
                is_background_color: single.is_background_color == 0 ? false : true,
                type: {
                    uid: singleStoryContentType == null ? '-' : singleStoryContentType.uid,
                    type: singleStoryContentType == null ? '-' : singleStoryContentType.type
                },
                created_at: utils_1.Utils.formatDate(single.created_at),
                updated_at: utils_1.Utils.formatDate(single.updated_at)
            };
            utils_1.Utils.response(res, 200, false, "", data);
        }
        catch (_) {
            throw new common_1.HttpException('Internal Server Error', 400);
        }
    }
    async store(data, _, res) {
        try {
            let story = new store_dto_1.StoreStoryContentDto();
            story.uid = (0, uuid_1.v4)();
            story.content = data.content;
            story.content_type = data.content_type;
            story.background_color = data.background_color;
            story.is_background_color = data.is_background_color == true ? '1' : '0';
            this.validateStore(story);
            await this.storyContentService.store(story);
            utils_1.Utils.response(res, 200, false, "", null);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 400);
        }
    }
    async update(data, _, res, uid) {
        try {
            let story = new update_dto_1.UpdateStoryContentDto();
            story.content = data.content;
            story.content_type = data.content_type;
            story.background_color = data.background_color;
            story.is_background_color = data.is_background_color;
            this.validateUpdate(story);
            let storyContents = new story_content_entity_1.StoryContents();
            storyContents.content = story.content;
            storyContents.uid_content_type = story.content_type;
            storyContents.background_color = story.background_color;
            storyContents.is_background_color = story.is_background_color;
            await this.storyContentService.update(uid, storyContents);
            utils_1.Utils.response(res, 200, false, "", null);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 400);
        }
    }
    async delete(_, res, uid) {
        try {
            const single = await this.storyContentService.find(uid);
            if (typeof single == "undefined") {
                throw new common_1.HttpException('Data not found', 400);
            }
            else {
                await this.storyContentService.destroy(uid);
                utils_1.Utils.response(res, 200, false, "", null);
            }
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 400);
        }
    }
    validateStore(data) {
        if (data.content == '')
            throw new Error(`content is required`);
        if (data.content_type == '')
            throw new Error(`uid_content_type is required`);
        if (data.background_color == '')
            throw new Error(`background_color is required`);
        if (data.is_background_color == '')
            throw new Error(`is_background_error is required`);
    }
    validateUpdate(data) {
        if (data.content == '')
            throw new Error(`content is required`);
        if (data.content_type == '')
            throw new Error(`uid_content_type is required`);
        if (data.background_color == '')
            throw new Error(`background_color is required`);
        if (data.is_background_color == '')
            throw new Error(`is_background_error is required`);
    }
    uploadFile(file) {
    }
};
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StoryContentController.prototype, "all", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('single'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], StoryContentController.prototype, "single", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('store'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_dto_1.StoreStoryContentDto, Object, Object]),
    __metadata("design:returntype", Promise)
], StoryContentController.prototype, "store", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_dto_1.UpdateStoryContentDto, Object, Object, String]),
    __metadata("design:returntype", Promise)
], StoryContentController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], StoryContentController.prototype, "delete", null);
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
], StoryContentController.prototype, "uploadFile", null);
StoryContentController = __decorate([
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.Controller)('story-content/v1'),
    __metadata("design:paramtypes", [story_content_service_1.StoryContentService,
        story_content_type_service_1.StoryContentTypeService])
], StoryContentController);
exports.StoryContentController = StoryContentController;
//# sourceMappingURL=story-content.controller.js.map