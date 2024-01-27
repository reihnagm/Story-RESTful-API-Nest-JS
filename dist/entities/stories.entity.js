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
exports.Stories = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
const story_types_entity_1 = require("./story_types.entity");
let Stories = class Stories {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Object)
], Stories.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, generated: 'uuid' }),
    __metadata("design:type", String)
], Stories.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "longtext"
    }),
    __metadata("design:type", Object)
], Stories.prototype, "caption", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: "36"
    }),
    __metadata("design:type", Object)
], Stories.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: "36"
    }),
    __metadata("design:type", Object)
], Stories.prototype, "type_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: "255",
        default: ''
    }),
    __metadata("design:type", Object)
], Stories.prototype, "media", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: "255",
        default: ''
    }),
    __metadata("design:type", Object)
], Stories.prototype, "background_color", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: "255",
        default: ''
    }),
    __metadata("design:type", Object)
], Stories.prototype, "text_color", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: "255",
        default: ''
    }),
    __metadata("design:type", Object)
], Stories.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        default: () => 'NOW()',
    }),
    __metadata("design:type", Object)
], Stories.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        default: () => 'NOW()',
    }),
    __metadata("design:type", Object)
], Stories.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users, (users) => users.stories, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'user_id',
        referencedColumnName: 'uid'
    }),
    __metadata("design:type", users_entity_1.Users)
], Stories.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => story_types_entity_1.StoryTypes, (StoryTypes) => StoryTypes.stories, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'type_id',
        referencedColumnName: 'uid'
    }),
    __metadata("design:type", story_types_entity_1.StoryTypes)
], Stories.prototype, "type", void 0);
Stories = __decorate([
    (0, typeorm_1.Entity)()
], Stories);
exports.Stories = Stories;
//# sourceMappingURL=stories.entity.js.map