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
exports.UserStories = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
const stories_entity_1 = require("./stories.entity");
let UserStories = class UserStories {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Object)
], UserStories.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, generated: 'uuid' }),
    __metadata("design:type", String)
], UserStories.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: "36"
    }),
    __metadata("design:type", Object)
], UserStories.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: "36"
    }),
    __metadata("design:type", Object)
], UserStories.prototype, "story_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        default: () => 'NOW()',
    }),
    __metadata("design:type", Object)
], UserStories.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        default: () => 'NOW()',
    }),
    __metadata("design:type", Object)
], UserStories.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users, (users) => users.stories, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'user_id',
        referencedColumnName: 'uid'
    }),
    __metadata("design:type", users_entity_1.Users)
], UserStories.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => stories_entity_1.Stories, (stories) => stories.user, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'story_id',
        referencedColumnName: 'uid'
    }),
    __metadata("design:type", stories_entity_1.Stories)
], UserStories.prototype, "story", void 0);
UserStories = __decorate([
    (0, typeorm_1.Entity)()
], UserStories);
exports.UserStories = UserStories;
//# sourceMappingURL=user_stories.entity.js.map