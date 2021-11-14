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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryViewController = void 0;
const common_1 = require("@nestjs/common");
const Observable_1 = require("rxjs/internal/Observable");
const story_view_interface_1 = require("../interfaces/story_view.interface");
const story_view_service_1 = require("./story_view.service");
let StoryViewController = class StoryViewController {
    constructor(storyViewService) {
        this.storyViewService = storyViewService;
    }
    getStoryViews() {
        return this.storyViewService.findAll();
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Observable_1.Observable)
], StoryViewController.prototype, "getStoryViews", null);
StoryViewController = __decorate([
    (0, common_1.Controller)('story-view'),
    __metadata("design:paramtypes", [story_view_service_1.StoryViewService])
], StoryViewController);
exports.StoryViewController = StoryViewController;
//# sourceMappingURL=story_view.controller.js.map