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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const stories_entity_1 = require("./stories.entity");
let Users = class Users {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Object)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, generated: 'uuid' }),
    __metadata("design:type", String)
], Users.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: "255"
    }),
    __metadata("design:type", Object)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: "255"
    }),
    __metadata("design:type", Object)
], Users.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: "255",
    }),
    __metadata("design:type", Object)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        default: () => 'NOW()',
    }),
    __metadata("design:type", Object)
], Users.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        default: () => 'NOW()',
    }),
    __metadata("design:type", Object)
], Users.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => stories_entity_1.Stories, (stories) => stories.user),
    __metadata("design:type", Array)
], Users.prototype, "stories", void 0);
Users = __decorate([
    (0, typeorm_1.Entity)()
], Users);
exports.Users = Users;
//# sourceMappingURL=users.entity.js.map