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
exports.StoryViewController = exports.editFileName = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const uuid_1 = require("uuid");
const store_story_view_dto_1 = require("../dto/store-story-view.dto");
const update_story_view_dto_1 = require("../dto/update-story-view.dto");
const utils_1 = require("../utils/utils");
const story_view_service_1 = require("./story_view.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const story_view_content_entity_1 = require("../entities/story_view_content.entity");
const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = (0, path_1.extname)(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
exports.editFileName = editFileName;
let StoryViewController = class StoryViewController {
    constructor(storyViewService) {
        this.storyViewService = storyViewService;
    }
    async all(req, res, uid) {
        if (uid) {
            const s = await this.storyViewService.findStoryViewContent(uid);
            const b = await this.storyViewService.findAllStoryContentType(s.uid_content_type);
            return utils_1.Utils.response(res, 200, false, "", {
                uid: s.uid,
                content: s.content,
                backgroundColor: s.backgroundColor,
                isBackgroundColor: s.isBackgroundColor == 0 ? false : true,
                type: {
                    uid: b.uid,
                    type: b.type
                },
                createdAt: s.createdAt,
                updatedAt: s.updatedAt
            });
        }
        else {
            try {
                const a = await this.storyViewService.findAllStoryViewContent();
                let data = [];
                for (let i = 0; i < a.length; i++) {
                    const b = await this.storyViewService.findAllStoryContentType(a[i].uid_content_type);
                    data.push({
                        uid: a[i].uid,
                        content: a[i].content,
                        backgroundColor: a[i].backgroundColor,
                        isBackgroundColor: a[i].isBackgroundColor == 0 ? false : true,
                        type: {
                            uid: b.uid,
                            type: b.type
                        },
                        createdAt: a[i].createdAt,
                        updatedAt: a[i].updatedAt,
                    });
                }
                return utils_1.Utils.response(res, 200, false, "", data);
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    async store(data, req, res) {
        try {
            let story = new store_story_view_dto_1.StoreStoryViewDto();
            story.uid = (0, uuid_1.v4)();
            story.content = data.content;
            story.uid_content_type = data.uid_content_type;
            story.backgroundColor = data.backgroundColor;
            story.isBackgroundColor = data.isBackgroundColor;
            (0, class_validator_1.validate)(story).then(async (errors) => {
                if (errors.length > 0) {
                    return utils_1.Utils.response(res, 400, true, "", errors[0].constraints);
                }
                else {
                    await this.storyViewService.storeStoryViewContent(story);
                    return utils_1.Utils.response(res, 200, false, "", story);
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    async update(data, uid, req, res) {
        try {
            let story = new update_story_view_dto_1.UpdateStoryViewDto();
            story.content = data.content;
            story.uid_content_type = data.uid_content_type;
            story.backgroundColor = data.backgroundColor;
            story.isBackgroundColor = data.isBackgroundColor;
            (0, class_validator_1.validate)(story).then(async (errors) => {
                if (errors.length > 0) {
                    return utils_1.Utils.response(res, 400, true, "", errors[0].constraints);
                }
                else {
                    let s = new story_view_content_entity_1.StoryViewContent();
                    s.content = story.content;
                    s.uid_content_type = story.uid_content_type;
                    s.backgroundColor = story.backgroundColor;
                    s.isBackgroundColor = story.isBackgroundColor;
                    await this.storyViewService.update(uid, s);
                    return utils_1.Utils.response(res, 200, false, "", null);
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    uploadFile(file) {
    }
    async deleteStoryViewContent(req, res, uid) {
        try {
            const a = await this.storyViewService.findStoryViewContent(uid);
            if (typeof a == "undefined") {
                this.storyViewService.destroyStoryViewContent(uid);
                return utils_1.Utils.response(res, 400, true, "data not found", null);
            }
            else {
                this.storyViewService.destroyStoryViewContent(uid);
                return utils_1.Utils.response(res, 200, false, "", null);
            }
        }
        catch (e) {
            console.log(e);
        }
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
], StoryViewController.prototype, "all", null);
__decorate([
    (0, common_1.Post)('store'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_story_view_dto_1.StoreStoryViewDto, Object, Object]),
    __metadata("design:returntype", Promise)
], StoryViewController.prototype, "store", null);
__decorate([
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('uid')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_story_view_dto_1.UpdateStoryViewDto, String, Object, Object]),
    __metadata("design:returntype", Promise)
], StoryViewController.prototype, "update", null);
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
], StoryViewController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Delete)('destroy'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], StoryViewController.prototype, "deleteStoryViewContent", null);
StoryViewController = __decorate([
    (0, common_1.Controller)('story-view'),
    __metadata("design:paramtypes", [story_view_service_1.StoryViewService])
], StoryViewController);
exports.StoryViewController = StoryViewController;
//# sourceMappingURL=story_view.controller.js.map