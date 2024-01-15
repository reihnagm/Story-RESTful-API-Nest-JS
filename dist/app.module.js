"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const users_http_module_1 = require("./modules/users/users-http.module");
const stories_http_module_1 = require("./modules/stories/stories.http.module");
const story_types_http_module_1 = require("./modules/story-types/story-types.http.module");
const common_1 = require("@nestjs/common");
const serve_static_1 = require("@nestjs/serve-static");
const typeorm_1 = require("@nestjs/typeorm");
const path_1 = require("path");
const not_found_1 = require("./middlewares/not-found");
const core_1 = require("@nestjs/core");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(not_found_1.NotFoundMiddleware).forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public/'),
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'root',
                database: 'story_view',
                autoLoadEntities: true,
                synchronize: true,
            }),
            users_http_module_1.UsersHttpModule,
            core_1.RouterModule.register([
                {
                    path: 'users/v1',
                    module: users_http_module_1.UsersHttpModule,
                }
            ]),
            stories_http_module_1.StoriesHttpModule,
            core_1.RouterModule.register([
                {
                    path: 'stories/v1',
                    module: stories_http_module_1.StoriesHttpModule,
                },
            ]),
            story_types_http_module_1.StoryTypesHttpModule,
            core_1.RouterModule.register([
                {
                    path: 'story-types/v1',
                    module: story_types_http_module_1.StoryTypesHttpModule,
                }
            ])
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map