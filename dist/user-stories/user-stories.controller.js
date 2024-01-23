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
const update_dto_1 = require("../dto/stories/update.dto");
const utils_1 = require("../utils/utils");
const users_guard_1 = require("../users/users.guard");
const throttler_1 = require("@nestjs/throttler");
const form_store_dto_1 = require("../dto/user-stories/form.store.dto");
const user_stories_service_1 = require("./user-stories.service");
let UserStoriesController = class UserStoriesController {
    constructor(userStoriesService) {
        this.userStoriesService = userStoriesService;
    }
    async all(_, res) {
        try {
            const userStories = await this.userStoriesService.findAll();
            new utils_1.ResponseOk(res, 200, false, "", []);
        }
        catch (_) {
            new common_1.HttpException('Internal Server Error', 400);
        }
    }
    async single(_, res, uid) {
        try {
            new utils_1.ResponseOk(res, 200, false, "", null);
        }
        catch (_) {
            new common_1.HttpException('Internal Server Error', 400);
        }
    }
    async store(data, _, res) {
        try {
            new utils_1.ResponseOk(res, 200, false, "", null);
        }
        catch (e) {
            new common_1.HttpException(e.message, 400);
        }
    }
    async update(data, _, res, id) {
        try {
            new utils_1.ResponseOk(res, 200, false, "", null);
        }
        catch (e) {
            new common_1.HttpException(e.message, 400);
        }
    }
    async delete(_, res, uid) {
        try {
            new utils_1.ResponseOk(res, 200, false, "", null);
        }
        catch (e) {
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
__decorate([
    (0, common_1.UseGuards)(users_guard_1.UsersGuard),
    (0, common_1.Post)('store'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [form_store_dto_1.FormUserStoriesDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UserStoriesController.prototype, "store", null);
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
], UserStoriesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(users_guard_1.UsersGuard),
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], UserStoriesController.prototype, "delete", null);
UserStoriesController = __decorate([
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [user_stories_service_1.UserStoriesService])
], UserStoriesController);
exports.UserStoriesController = UserStoriesController;
//# sourceMappingURL=user-stories.controller.js.map