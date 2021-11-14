"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryViewService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let StoryViewService = class StoryViewService {
    constructor() {
        this.stories = [
            {
                id: 1,
                uid: 'deb9cb73-f055-43f3-8abe-1644586581a0',
                content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                uid_content_type: '946e992a-7268-491b-89d8-5d9e34e06f73',
                backgroundColor: '',
                isBackgroundColor: 0,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ];
    }
    findAll() {
        return (0, rxjs_1.from)(this.stories);
    }
};
StoryViewService = __decorate([
    (0, common_1.Injectable)()
], StoryViewService);
exports.StoryViewService = StoryViewService;
//# sourceMappingURL=story_view.service.js.map