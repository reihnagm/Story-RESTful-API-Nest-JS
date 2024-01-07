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
exports.StoryContentTypeController = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const story_content_type_service_1 = require("./story-content-type.service");
const auth_guard_1 = require("../auth/auth.guard");
const throttler_1 = require("@nestjs/throttler");
const store_dto_1 = require("../dto/story-content-type/store.dto");
const update_dto_1 = require("../dto/story-content-type/update.dto");
const story_content_type_entity_1 = require("../entities/story_content_type.entity");
let StoryContentTypeController = class StoryContentTypeController {
    constructor(storyContentTypeService) {
        this.storyContentTypeService = storyContentTypeService;
    }
    async all(_, res) {
        try {
            const all = await this.storyContentTypeService.findAll();
            let data = [];
            for (let i = 0; i < all.length; i++) {
                data.push({
                    id: all[i].uid,
                    type: all[i].type,
                    created_at: utils_1.Utils.formatDate(all[i].created_at),
                    updated_at: utils_1.Utils.formatDate(all[i].updated_at),
                });
            }
            return utils_1.Utils.response(res, 200, false, "", data);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 400);
        }
    }
    async single(_, res, uid) {
        try {
            const single = await this.storyContentTypeService.find(uid);
            if (typeof single == 'undefined')
                throw new common_1.HttpException('Data not found', 400);
            let data = {
                id: single.uid,
                type: single.type,
                created_at: utils_1.Utils.formatDate(single.created_at),
                updated_at: utils_1.Utils.formatDate(single.updated_at),
            };
            utils_1.Utils.response(res, 200, false, "", data);
        }
        catch (_) {
            throw new common_1.HttpException('Internal Server Error', 400);
        }
    }
    async store(data, _, res) {
        try {
            let story = new store_dto_1.StoreStoryContentTypeDto();
            story.uid = (0, uuid_1.v4)();
            story.type = data.type;
            await this.storyContentTypeService.store(story);
            utils_1.Utils.response(res, 200, false, "", null);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 400);
        }
    }
    async update(data, _, res, uid) {
        try {
            let story = new update_dto_1.UpdateStoryContentTypeDto();
            story.type = data.type;
            let storyContentsTypes = new story_content_type_entity_1.StoryContentTypes();
            storyContentsTypes.type = story.type;
            await this.storyContentTypeService.update(uid, storyContentsTypes);
            utils_1.Utils.response(res, 200, false, "", null);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 400);
        }
    }
    async delete(_, res, uid) {
        try {
            const single = await this.storyContentTypeService.find(uid);
            if (typeof single == "undefined") {
                throw new common_1.HttpException('Data not found', 400);
            }
            else {
                await this.storyContentTypeService.destroy(uid);
                utils_1.Utils.response(res, 200, false, "", null);
            }
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 400);
        }
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
], StoryContentTypeController.prototype, "all", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('single'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], StoryContentTypeController.prototype, "single", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('store'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_dto_1.StoreStoryContentTypeDto, Object, Object]),
    __metadata("design:returntype", Promise)
], StoryContentTypeController.prototype, "store", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_dto_1.UpdateStoryContentTypeDto, Object, Object, String]),
    __metadata("design:returntype", Promise)
], StoryContentTypeController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], StoryContentTypeController.prototype, "delete", null);
StoryContentTypeController = __decorate([
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.Controller)('story-content-type/v1'),
    __metadata("design:paramtypes", [story_content_type_service_1.StoryContentTypeService])
], StoryContentTypeController);
exports.StoryContentTypeController = StoryContentTypeController;
//# sourceMappingURL=story-content-type.controller.js.map