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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryTypesController = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const story_types_service_1 = require("./story-types.service");
const users_guard_1 = require("../users/users.guard");
const store_dto_1 = require("../dto/story-types/store.dto");
const update_dto_1 = require("../dto/story-types/update.dto");
const story_types_entity_1 = require("../entities/story_types.entity");
let StoryTypesController = class StoryTypesController {
    constructor(storyTypesService) {
        this.storyTypesService = storyTypesService;
    }
    async all(_, res) {
        try {
            const storyTypes = await this.storyTypesService.findAll();
            let data = [];
            for (let i = 0; i < storyTypes.length; i++) {
                data.push({
                    id: storyTypes[i].uid,
                    type: storyTypes[i].type,
                    created_at: utils_1.Utils.formatDate(storyTypes[i].created_at),
                    updated_at: utils_1.Utils.formatDate(storyTypes[i].updated_at),
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
            const storyTypes = await this.storyTypesService.find(uid);
            if (typeof storyTypes == 'undefined')
                throw new common_1.HttpException('Data not found', 400);
            let data = {
                id: storyTypes.uid,
                type: storyTypes.type,
                created_at: utils_1.Utils.formatDate(storyTypes.created_at),
                updated_at: utils_1.Utils.formatDate(storyTypes.updated_at),
            };
            utils_1.Utils.response(res, 200, false, "", data);
        }
        catch (_) {
            throw new common_1.HttpException('Internal Server Error', 400);
        }
    }
    async store(data, _, res) {
        try {
            let storyTypes = new store_dto_1.StoreStoryTypesDto();
            storyTypes.uid = (0, uuid_1.v4)();
            storyTypes.type = data.type;
            await this.storyTypesService.store(storyTypes);
            utils_1.Utils.response(res, 200, false, "", null);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 400);
        }
    }
    async update(data, _, res, uid) {
        try {
            let updateStoryTypes = new update_dto_1.UpdateStoryTypesDto();
            updateStoryTypes.type = data.type;
            let storyTypes = new story_types_entity_1.StoryTypes();
            storyTypes.type = updateStoryTypes.type;
            await this.storyTypesService.update(uid, storyTypes);
            utils_1.Utils.response(res, 200, false, "", null);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 400);
        }
    }
    async delete(_, res, uid) {
        try {
            const storyTypes = await this.storyTypesService.find(uid);
            if (typeof storyTypes == "undefined") {
                throw new common_1.HttpException('Data not found', 400);
            }
            else {
                await this.storyTypesService.destroy(uid);
                utils_1.Utils.response(res, 200, false, "", null);
            }
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 400);
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(users_guard_1.UsersGuard),
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof common_1.Request !== "undefined" && common_1.Request) === "function" ? _a : Object, typeof (_b = typeof common_1.Response !== "undefined" && common_1.Response) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], StoryTypesController.prototype, "all", null);
__decorate([
    (0, common_1.UseGuards)(users_guard_1.UsersGuard),
    (0, common_1.Get)('single'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof common_1.Request !== "undefined" && common_1.Request) === "function" ? _c : Object, typeof (_d = typeof common_1.Response !== "undefined" && common_1.Response) === "function" ? _d : Object, String]),
    __metadata("design:returntype", Promise)
], StoryTypesController.prototype, "single", null);
__decorate([
    (0, common_1.UseGuards)(users_guard_1.UsersGuard),
    (0, common_1.Post)('store'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_dto_1.StoreStoryTypesDto, typeof (_e = typeof common_1.Request !== "undefined" && common_1.Request) === "function" ? _e : Object, typeof (_f = typeof common_1.Response !== "undefined" && common_1.Response) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], StoryTypesController.prototype, "store", null);
__decorate([
    (0, common_1.UseGuards)(users_guard_1.UsersGuard),
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_dto_1.UpdateStoryTypesDto, typeof (_g = typeof common_1.Request !== "undefined" && common_1.Request) === "function" ? _g : Object, typeof (_h = typeof common_1.Response !== "undefined" && common_1.Response) === "function" ? _h : Object, String]),
    __metadata("design:returntype", Promise)
], StoryTypesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(users_guard_1.UsersGuard),
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof common_1.Request !== "undefined" && common_1.Request) === "function" ? _j : Object, typeof (_k = typeof common_1.Response !== "undefined" && common_1.Response) === "function" ? _k : Object, String]),
    __metadata("design:returntype", Promise)
], StoryTypesController.prototype, "delete", null);
StoryTypesController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [story_types_service_1.StoryTypesService])
], StoryTypesController);
exports.StoryTypesController = StoryTypesController;
//# sourceMappingURL=story-types.controller.js.map