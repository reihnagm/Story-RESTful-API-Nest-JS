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
exports.StoryTypeController = void 0;
const common_1 = require("@nestjs/common");
const store_dto_1 = require("../dto/story-content/store.dto");
const update_dto_1 = require("../dto/story-content/update.dto");
const utils_1 = require("../utils/utils");
const story_type_service_1 = require("./story-type.service");
const auth_guard_1 = require("../auth/auth.guard");
const throttler_1 = require("@nestjs/throttler");
let StoryTypeController = class StoryTypeController {
    constructor(storyTypeService) {
        this.storyTypeService = storyTypeService;
    }
    async all(_, res) {
        try {
            let data = [];
            return utils_1.Utils.response(res, 200, false, "", []);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 400);
        }
    }
    async store(data, _, res) {
        try {
            let data = [];
            return utils_1.Utils.response(res, 200, false, "", data);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 400);
        }
    }
    async update(data, _, res, uid) {
        try {
            let data = [];
            return utils_1.Utils.response(res, 200, false, "", data);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 400);
        }
    }
    async deleteStoryViewContent(_, res, uid) {
        try {
            let data = [];
            return utils_1.Utils.response(res, 200, false, "", data);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 400);
        }
    }
};
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StoryTypeController.prototype, "all", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('store'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_dto_1.StoreStoryDto, Object, Object]),
    __metadata("design:returntype", Promise)
], StoryTypeController.prototype, "store", null);
__decorate([
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Query)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_dto_1.UpdateStoryDto, Object, Object, String]),
    __metadata("design:returntype", Promise)
], StoryTypeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('destroy'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], StoryTypeController.prototype, "deleteStoryViewContent", null);
StoryTypeController = __decorate([
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.Controller)('story-content-type/v1'),
    __metadata("design:paramtypes", [story_type_service_1.StoryTypeService])
], StoryTypeController);
exports.StoryTypeController = StoryTypeController;
//# sourceMappingURL=story-type.controller.js.map