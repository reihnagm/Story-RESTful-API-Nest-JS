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
    constructor(userStories, connection, logger) {
        this.userStories = userStories;
        this.connection = connection;
        this.logger = logger;
    }
    async findAll() {
        try {
            const query = `SELECT u.uid, u.email, u.phone, 
            GROUP_CONCAT(s.uid) story_id
            FROM user_stories us 
            INNER JOIN users u ON us.user_id = u.uid
            INNER JOIN stories s ON us.story_id = s.uid
            GROUP BY u.id, u.email, u.phone`;
            return this.connection.query(query);
        }
        catch (e) {
            this.logger.error(e.message, e.stack);
        }
    }
    async findAllById(id) {
        try {
            const query = `SELECT u.uid, u.email, u.phone, 
            GROUP_CONCAT(s.uid) story_id
            FROM user_stories us 
            INNER JOIN users u ON us.user_id = u.uid
            INNER JOIN stories s ON us.story_id = s.uid
            WHERE u.uid = '${id}'
            GROUP BY u.id, u.email, u.phone`;
            return this.connection.query(query);
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
};
__decorate([
    __param(0, (0, common_2.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserStoriesService.prototype, "findAllById", null);
__decorate([
    __param(0, (0, common_2.Param)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_dto_1.StoreUserStoriesDto]),
    __metadata("design:returntype", Promise)
], UserStoriesService.prototype, "store", null);
UserStoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_stories_entity_1.UserStories)),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Connection,
        winston_logger_service_1.WinstonLoggerService])
], UserStoriesService);
exports.UserStoriesService = UserStoriesService;
//# sourceMappingURL=user-stories.service.js.map