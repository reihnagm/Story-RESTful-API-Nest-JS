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
exports.StoryTypes = void 0;
const typeorm_1 = require("typeorm");
let StoryTypes = class StoryTypes {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: "int",
    }),
    __metadata("design:type", Object)
], StoryTypes.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        unique: true,
        length: "36"
    }),
    __metadata("design:type", Object)
], StoryTypes.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: "20"
    }),
    __metadata("design:type", Object)
], StoryTypes.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        default: () => 'NOW()',
    }),
    __metadata("design:type", Object)
], StoryTypes.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        default: () => 'NOW()',
    }),
    __metadata("design:type", Object)
], StoryTypes.prototype, "updated_at", void 0);
StoryTypes = __decorate([
    (0, typeorm_1.Entity)()
], StoryTypes);
exports.StoryTypes = StoryTypes;
//# sourceMappingURL=story_types.entity.js.map