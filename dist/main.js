"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const unauthorized_exception_1 = require("./filters/unauthorized_exception");
const http_exception_1 = require("./filters/http_exception");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new unauthorized_exception_1.UnauthorizedExceptionFilter());
    app.useGlobalFilters(new http_exception_1.HttpExceptionFilter());
    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map