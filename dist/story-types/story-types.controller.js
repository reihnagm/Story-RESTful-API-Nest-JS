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
exports.StoryTypesController = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../utils/utils");
const story_types_service_1 = require("./story-types.service");
const users_guard_1 = require("../users/users.guard");
const store_dto_1 = require("../dto/story-types/store.dto");
const update_dto_1 = require("../dto/story-types/update.dto");
const story_types_entity_1 = require("../entities/story_types.entity");
const throttler_1 = require("@nestjs/throttler");
const winston_logger_service_1 = require("../winston.logger.service");
let StoryTypesController = class StoryTypesController {
    constructor(storyTypesService, logger) {
        this.storyTypesService = storyTypesService;
        this.logger = logger;
    }
    async all(_, res) {
        try {
            const storyTypes = await this.storyTypesService.findAll();
            let data = [];
            for (let i = 0; i < storyTypes.length; i++) {
                var storyType = storyTypes[i];
                data.push({
                    id: storyType.id,
                    type: storyType.name,
                    created_at: utils_1.Utils.formatDateWithSeconds(storyType.created_at),
                    updated_at: utils_1.Utils.formatDateWithSeconds(storyType.updated_at),
                });
            }
            new utils_1.CResponse(res, 200, false, "", data);
        }
        catch (e) {
            this.logger.error(e.message, e.stack);
            new common_1.HttpException(e.message, 400);
        }
    }
    async single(_, res, uid) {
        try {
            const storyTypes = await this.storyTypesService.find(uid);
            if (typeof storyTypes == "undefined")
                new common_1.HttpException("Data not found", 400);
            let data = {
                id: storyTypes.uid,
                type: storyTypes.name,
                created_at: utils_1.Utils.formatDate(storyTypes.created_at),
                updated_at: utils_1.Utils.formatDate(storyTypes.updated_at),
            };
            new utils_1.CResponse(res, 200, false, "", data);
        }
        catch (e) {
            this.logger.error(e.message, e.stack);
            new common_1.HttpException(e.message, 400);
        }
    }
    async store(data, _, res) {
        try {
            let storyTypes = new store_dto_1.StoreStoryTypesDto();
            storyTypes.name = data.name;
            await this.storyTypesService.store(storyTypes);
            new utils_1.CResponse(res, 200, false, "", null);
        }
        catch (e) {
            this.logger.error(e.message, e.stack);
            new common_1.HttpException(e.message, 400);
        }
    }
    async update(data, _, res, id) {
        try {
            let checkStoryTypes = await this.storyTypesService.find(id);
            if (typeof checkStoryTypes == "undefined")
                new common_1.HttpException("Data not found", 400);
            let updateStoryTypes = new update_dto_1.UpdateStoryTypesDto();
            updateStoryTypes.name = data.name;
            let storyTypes = new story_types_entity_1.StoryTypes();
            storyTypes.name = updateStoryTypes.name;
            await this.storyTypesService.update(id, storyTypes);
            new utils_1.CResponse(res, 200, false, "", null);
        }
        catch (e) {
            this.logger.error(e.message, e.stack);
            new common_1.HttpException(e.message, 400);
        }
    }
    async delete(_, res, uid) {
        try {
            const storyTypes = await this.storyTypesService.find(uid);
            if (typeof storyTypes == "undefined")
                new common_1.HttpException("Data not found", 400);
            await this.storyTypesService.destroy(uid);
            new utils_1.CResponse(res, 200, false, "", null);
        }
        catch (e) {
            this.logger.error(e.message, e.stack);
            new common_1.HttpException(e.message, 400);
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
], StoryTypesController.prototype, "all", null);
__decorate([
    (0, common_1.UseGuards)(users_guard_1.UsersGuard),
    (0, common_1.Get)('single'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], StoryTypesController.prototype, "single", null);
__decorate([
    (0, common_1.UseGuards)(users_guard_1.UsersGuard),
    (0, common_1.Post)('store'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_dto_1.StoreStoryTypesDto, Object, Object]),
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
    __metadata("design:paramtypes", [update_dto_1.UpdateStoryTypesDto, Object, Object, String]),
    __metadata("design:returntype", Promise)
], StoryTypesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(users_guard_1.UsersGuard),
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], StoryTypesController.prototype, "delete", null);
StoryTypesController = __decorate([
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [story_types_service_1.StoryTypesService,
        winston_logger_service_1.WinstonLoggerService])
], StoryTypesController);
exports.StoryTypesController = StoryTypesController;
//# sourceMappingURL=story-types.controller.js.map