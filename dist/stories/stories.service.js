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
exports.StoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const stories_entity_1 = require("../entities/stories.entity");
const common_2 = require("@nestjs/common");
const store_dto_1 = require("../dto/stories/store.dto");
const winston_logger_service_1 = require("../winston.logger.service");
let StoriesService = class StoriesService {
    constructor(storiesRepository, logger) {
        this.storiesRepository = storiesRepository;
        this.logger = logger;
    }
    async findAll() {
        try {
            return await this.storiesRepository
                .createQueryBuilder("s")
                .select("s.uid, s.caption, s.media, s.background_color, s.text_color, s.duration, s.type, s.created_at, s.updated_at")
                .orderBy("s.id", "DESC")
                .getRawMany();
        }
        catch (e) {
            this.logger.error(e.message, e.stack);
        }
    }
    async findAllById(id) {
        try {
            return await this.storiesRepository
                .createQueryBuilder("s")
                .select("s.uid, s.caption, s.media, s.background_color, s.text_color, s.duration, s.type, s.created_at, s.updated_at")
                .where("uid = :uid", { uid: id })
                .getRawMany();
        }
        catch (e) {
            this.logger.error(e.message, e.stack);
        }
    }
    async find(id) {
        try {
            return await this.storiesRepository
                .createQueryBuilder("s")
                .select("s.uid, s.caption, s.media, s.background_color, s.text_color, s.duration, s.type, s.created_at, s.updated_at")
                .where("uid = :uid", { uid: id })
                .getRawOne();
        }
        catch (e) {
            this.logger.error(e.message, e.stack);
        }
    }
    async update(id, data) {
        try {
            return await this.storiesRepository.update({ uid: id }, {
                caption: data.caption
            });
        }
        catch (e) {
            this.logger.error(e.message, e.stack);
        }
    }
    async store(data) {
        try {
            return (await this.storiesRepository.save(data)).uid;
        }
        catch (e) {
            this.logger.error(e.message, e.stack);
        }
    }
    async destroy(id) {
        try {
            return await this.storiesRepository.delete({
                uid: id
            });
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
], StoriesService.prototype, "findAllById", null);
__decorate([
    __param(0, (0, common_2.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StoriesService.prototype, "find", null);
__decorate([
    __param(0, (0, common_2.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, stories_entity_1.Stories]),
    __metadata("design:returntype", Promise)
], StoriesService.prototype, "update", null);
__decorate([
    __param(0, (0, common_2.Param)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_dto_1.StoreStoriesDto]),
    __metadata("design:returntype", Promise)
], StoriesService.prototype, "store", null);
__decorate([
    __param(0, (0, common_2.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StoriesService.prototype, "destroy", null);
StoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(stories_entity_1.Stories)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        winston_logger_service_1.WinstonLoggerService])
], StoriesService);
exports.StoriesService = StoriesService;
//# sourceMappingURL=stories.service.js.map