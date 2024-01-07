"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryContentTypeHttpModule = void 0;
const story_content_type_service_1 = require("../../story-content-type/story-content-type.service");
const story_content_type_controller_1 = require("../../story-content-type/story-content-type.controller");
const common_1 = require("@nestjs/common");
const story_content_module_1 = require("../story-content/story-content.module");
const jwt_1 = require("@nestjs/jwt");
let StoryContentTypeHttpModule = class StoryContentTypeHttpModule {
};
StoryContentTypeHttpModule = __decorate([
    (0, common_1.Module)({
        imports: [
            story_content_module_1.StoryModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
            })
        ],
        providers: [story_content_type_service_1.StoryContentTypeService],
        controllers: [story_content_type_controller_1.StoryContentTypeController]
    })
], StoryContentTypeHttpModule);
exports.StoryContentTypeHttpModule = StoryContentTypeHttpModule;
//# sourceMappingURL=story-content-type.http.module.js.map