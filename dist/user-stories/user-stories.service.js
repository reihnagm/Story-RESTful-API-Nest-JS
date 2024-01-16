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
exports.UserStoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const common_2 = require("@nestjs/common");
const user_stories_entity_1 = require("../entities/user_stories.entity");
const store_dto_1 = require("../dto/user-stories/store.dto");
const winston_logger_service_1 = require("../winston.logger.service");
let UserStoriesService = class UserStoriesService {
    constructor(userStories, logger) {
        this.userStories = userStories;
        this.logger = logger;
    }
    async findAll() {
        try {
            return await this.userStories
                .createQueryBuilder("s")
                .select("s.uid, s.user_id, s.story_id, s.created_at, s.updated_at")
                .orderBy("s.uid", "DESC")
                .getRawMany();
        }
        catch (e) {
            this.logger.error(e.message, e.stack);
        }
    }
    async find(uid) {
        try {
            return await this.userStories
                .createQueryBuilder("s")
                .select("s.uid, s.user_id, s.story_id, s.created_at, s.updated_at")
                .where("uid = :uid", { uid: uid })
                .getRawOne();
        }
        catch (e) {
            this.logger.error(e.message, e.stack);
        }
    }
    async update(uid, data) {
        try {
            return await this.userStories.update({ uid: uid }, {
                user_id: data.user_id
            });
        }
        catch (e) {
            this.logger.error(e.message, e.stack);
        }
    }
    async store(data) {
        try {
            return await this.userStories.save(data);
        }
        catch (e) {
            this.logger.error(e.message, e.stack);
        }
    }
    async destroy(uid) {
        try {
            return await this.userStories.delete({
                uid: uid
            });
        }
        catch (e) {
            this.logger.error(e.message, e.stack);
        }
    }
};
__decorate([
    __param(0, (0, common_2.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserStoriesService.prototype, "find", null);
__decorate([
    __param(0, (0, common_2.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_stories_entity_1.UserStories]),
    __metadata("design:returntype", Promise)
], UserStoriesService.prototype, "update", null);
__decorate([
    __param(0, (0, common_2.Param)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_dto_1.StoreUserStoriesDto]),
    __metadata("design:returntype", Promise)
], UserStoriesService.prototype, "store", null);
__decorate([
    __param(0, (0, common_2.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserStoriesService.prototype, "destroy", null);
UserStoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_stories_entity_1.UserStories)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        winston_logger_service_1.WinstonLoggerService])
], UserStoriesService);
exports.UserStoriesService = UserStoriesService;
//# sourceMappingURL=user-stories.service.js.map