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
exports.StoryContentController = exports.editFileName = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const uuid_1 = require("uuid");
const store_dto_1 = require("../dto/story-content/store.dto");
const update_dto_1 = require("../dto/story-content/update.dto");
const utils_1 = require("../utils/utils");
const story_service_1 = require("./story.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const story_content_entity_1 = require("../entities/story_content.entity");
const auth_guard_1 = require("../auth/auth.guard");
const throttler_1 = require("@nestjs/throttler");
const editFileName = (_, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = (0, path_1.extname)(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
exports.editFileName = editFileName;
let StoryContentController = class StoryContentController {
    constructor(storyService) {
        this.storyService = storyService;
    }
    async all(_, res, uid) {
        if (uid) {
            try {
                const single = await this.storyService.find(uid);
                if (typeof single == 'undefined') {
                    throw new common_1.HttpException('Data not found', 400);
                }
                const singleStoryContentType = await this.storyService.findStoryType(single.uid_content_type);
                return utils_1.Utils.response(res, 200, false, "", {
                    uid: single.uid,
                    content: single.content,
                    background_color: single.background_color,
                    is_background_color: single.is_background_color == 0 ? false : true,
                    type: {
                        uid: singleStoryContentType == null ? '-' : singleStoryContentType.uid,
                        type: singleStoryContentType == null ? '-' : singleStoryContentType.type
                    },
                    created_at: single.created_at,
                    updated_at: single.updated_at
                });
            }
            catch (e) {
                throw new common_1.HttpException(e.message, 400);
            }
        }
        else {
            try {
                const all = await this.storyService.findAll();
                let data = [];
                for (let i = 0; i < all.length; i++) {
                    const storyContentType = await this.storyService.findStoryType(all[i].uid_content_type);
                    data.push({
                        uid: all[i].uid,
                        content: all[i].content,
                        background_color: all[i].background_color,
                        is_background_color: all[i].is_background_color == 0 ? false : true,
                        type: {
                            uid: storyContentType == null ? '-' : storyContentType.uid,
                            type: storyContentType == null ? '-' : storyContentType.type
                        },
                        created_at: all[i].created_at,
                        updated_at: all[i].updated_at,
                    });
                }
                return utils_1.Utils.response(res, 200, false, "", data);
            }
            catch (e) {
                throw new common_1.HttpException(e.message, 400);
            }
        }
    }
    async store(data, _, res) {
        try {
            let story = new store_dto_1.StoreStoryDto();
            story.uid = (0, uuid_1.v4)();
            story.content = data.content;
            story.uid_content_type = data.uid_content_type;
            story.background_color = data.background_color;
            story.is_background_color = data.is_background_color;
            let errors = await (0, class_validator_1.validate)(story);
            if (errors.length > 0) {
                return utils_1.Utils.response(res, 400, true, "", errors[0].constraints);
            }
            else {
                await this.storyService.storeStoryContent(story);
                return utils_1.Utils.response(res, 200, false, "", null);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    async update(data, _, res, uid) {
        try {
            let story = new update_dto_1.UpdateStoryDto();
            story.content = data.content;
            story.uid_content_type = data.uid_content_type;
            story.background_color = data.background_color;
            story.is_background_color = data.is_background_color;
            let errors = await (0, class_validator_1.validate)(story);
            if (errors.length > 0) {
                return utils_1.Utils.response(res, 400, true, "", errors[0].constraints);
            }
            else {
                let s = new story_content_entity_1.StoryContents();
                s.content = story.content;
                s.uid_content_type = story.uid_content_type;
                s.background_color = story.background_color;
                s.is_background_color = story.is_background_color;
                await this.storyService.update(uid, s);
                return utils_1.Utils.response(res, 200, false, "", null);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    async deleteStoryViewContent(_, res, uid) {
        try {
            const a = await this.storyService.find(uid);
            if (typeof a == "undefined") {
                this.storyService.destroyStoryContent(uid);
                return utils_1.Utils.response(res, 400, true, "Data not found", null);
            }
            else {
                this.storyService.destroyStoryContent(uid);
                return utils_1.Utils.response(res, 200, false, "", null);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    uploadFile(file) {
    }
};
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], StoryContentController.prototype, "all", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('store'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_dto_1.StoreStoryDto, Object, Object]),
    __metadata("design:returntype", Promise)
], StoryContentController.prototype, "store", null);
__decorate([
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Query)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_dto_1.UpdateStoryDto, Object, Object, String]),
    __metadata("design:returntype", Promise)
], StoryContentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('destroy'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], StoryContentController.prototype, "deleteStoryViewContent", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './public/assets/media',
            filename: exports.editFileName,
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StoryContentController.prototype, "uploadFile", null);
StoryContentController = __decorate([
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.Controller)('story'),
    __metadata("design:paramtypes", [story_service_1.StoryService])
], StoryContentController);
exports.StoryContentController = StoryContentController;
//# sourceMappingURL=story.controller.js.map