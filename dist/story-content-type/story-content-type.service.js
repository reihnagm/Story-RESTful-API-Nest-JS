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
exports.StoryContentTypeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const story_content_type_entity_1 = require("../entities/story_content_type.entity");
const common_2 = require("@nestjs/common");
const store_dto_1 = require("../dto/story-content-type/store.dto");
let StoryContentTypeService = class StoryContentTypeService {
    constructor(storyContentTypeRepository) {
        this.storyContentTypeRepository = storyContentTypeRepository;
    }
    async findAll() {
        try {
            return await this.storyContentTypeRepository
                .createQueryBuilder("s")
                .select("s.uid, s.type, s.created_at, s.updated_At")
                .orderBy("s.id", "DESC")
                .getRawMany();
        }
        catch (e) {
            console.log(e);
        }
    }
    async find(uid) {
        try {
            return await this.storyContentTypeRepository
                .createQueryBuilder("storytype")
                .select("storytype.id, storytype.uid, storytype.type")
                .where("storytype.uid = :uid", { uid: uid })
                .getRawOne();
        }
        catch (e) {
            console.log(e);
        }
    }
    async update(uid, data) {
        try {
            return await this.storyContentTypeRepository.update({ uid: uid }, {
                type: data.type
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    async store(data) {
        try {
            return await this.storyContentTypeRepository.save(data);
        }
        catch (e) {
            console.log(e);
        }
    }
    async destroy(uid) {
        try {
            return await this.storyContentTypeRepository.delete({
                uid: uid
            });
        }
        catch (e) {
            console.log(e);
        }
    }
};
__decorate([
    __param(0, (0, common_2.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StoryContentTypeService.prototype, "find", null);
__decorate([
    __param(0, (0, common_2.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, story_content_type_entity_1.StoryContentTypes]),
    __metadata("design:returntype", Promise)
], StoryContentTypeService.prototype, "update", null);
__decorate([
    __param(0, (0, common_2.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_dto_1.StoreStoryContentTypeDto]),
    __metadata("design:returntype", Promise)
], StoryContentTypeService.prototype, "store", null);
__decorate([
    __param(0, (0, common_2.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StoryContentTypeService.prototype, "destroy", null);
StoryContentTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(story_content_type_entity_1.StoryContentTypes)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StoryContentTypeService);
exports.StoryContentTypeService = StoryContentTypeService;
//# sourceMappingURL=story-content-type.service.js.map