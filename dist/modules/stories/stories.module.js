"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoriesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const stories_entity_1 = require("../../entities/stories.entity");
const story_types_entity_1 = require("../../entities/story_types.entity");
const user_stories_entity_1 = require("../../entities/user_stories.entity");
let StoriesModule = class StoriesModule {
};
StoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                stories_entity_1.Stories,
                story_types_entity_1.StoryTypes,
                user_stories_entity_1.UserStories
            ]),
            config_1.ConfigModule.forRoot()
        ],
        exports: [typeorm_1.TypeOrmModule],
    })
], StoriesModule);
exports.StoriesModule = StoriesModule;
//# sourceMappingURL=stories.module.js.map