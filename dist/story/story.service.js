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
exports.StoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const story_content_entity_1 = require("../entities/story_content.entity");
const story_type_entity_1 = require("../entities/story_type.entity");
const common_2 = require("@nestjs/common");
const store_story_dto_1 = require("../dto/story-content/store-story.dto");
let StoryService = class StoryService {
    constructor(storyContentRepository) {
        this.storyContentRepository = storyContentRepository;
    }
    async findAll() {
        try {
            return await this.storyContentRepository
                .createQueryBuilder("story")
                .select("story.uid, story.content, story.background_color, story.is_background_color, story.uid_content_type, story.created_at, story.updated_at")
                .orderBy("story.id", "DESC")
                .getRawMany();
        }
        catch (e) {
            console.log(e);
        }
    }
    async find(uid) {
        try {
            return await this.storyContentRepository
                .createQueryBuilder("story")
                .select("story.uid, story.content, story.background_color, story.is_background_color, story.uid_content_type, story.created_at, story.updated_at")
                .where("uid = :uid", { uid: uid })
                .getRawOne();
        }
        catch (e) {
            console.log(e);
        }
    }
    async update(uid, data) {
        try {
            return await this.storyContentRepository.update({ uid: uid }, {
                content: data.content
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    async findStoryType(uid) {
        try {
            return await this.storyContentRepository
                .createQueryBuilder("storytype")
                .select("storytype.id, storytype.uid, storytype.type")
                .where("storytype.uid = :uid", { uid: uid })
                .getRawOne();
        }
        catch (e) {
            console.log(e);
        }
    }
    async storeStoryContent(data) {
        try {
            return await this.storyContentRepository.save(data);
        }
        catch (e) {
            console.log(e);
        }
    }
    async destroyStoryContent(uid) {
        try {
            return await this.storyContentRepository.delete({
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
], StoryService.prototype, "find", null);
__decorate([
    __param(0, (0, common_2.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, story_content_entity_1.StoryContents]),
    __metadata("design:returntype", Promise)
], StoryService.prototype, "update", null);
__decorate([
    __param(0, (0, common_2.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StoryService.prototype, "findStoryType", null);
__decorate([
    __param(0, (0, common_2.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_story_dto_1.StoreStoryDto]),
    __metadata("design:returntype", Promise)
], StoryService.prototype, "storeStoryContent", null);
__decorate([
    __param(0, (0, common_2.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StoryService.prototype, "destroyStoryContent", null);
StoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(story_content_entity_1.StoryContents)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StoryService);
exports.StoryService = StoryService;
//# sourceMappingURL=story.service.js.map