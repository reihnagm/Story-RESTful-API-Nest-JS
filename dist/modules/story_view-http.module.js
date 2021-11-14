"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryViewHttpModule = void 0;
const common_1 = require("@nestjs/common");
const story_view_module_1 = require("./story_view.module");
const story_view_service_1 = require("../story_view/story_view.service");
const story_view_controller_1 = require("../story_view/story_view.controller");
let StoryViewHttpModule = class StoryViewHttpModule {
};
StoryViewHttpModule = __decorate([
    (0, common_1.Module)({
        imports: [story_view_module_1.StoryViewModule],
        providers: [story_view_service_1.StoryViewService],
        controllers: [story_view_controller_1.StoryViewController]
    })
], StoryViewHttpModule);
exports.StoryViewHttpModule = StoryViewHttpModule;
//# sourceMappingURL=story_view-http.module.js.map