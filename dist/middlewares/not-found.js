"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundMiddleware = void 0;
const common_1 = require("@nestjs/common");
let NotFoundMiddleware = class NotFoundMiddleware {
    use(req, res, next) {
        const requestedUrl = req.baseUrl;
        const router = req.app._router;
        var allPath = router.stack
            .map(layer => {
            if (layer.route) {
                const path = layer.route?.path;
                return `${path}`;
            }
        }).filter(item => item !== undefined);
        var checkRoute = allPath.includes(requestedUrl);
        if (checkRoute) {
            next();
        }
        else {
            res
                .status(404)
                .json({
                status: 404,
                error: true,
                message: 'Not found',
            });
        }
    }
};
NotFoundMiddleware = __decorate([
    (0, common_1.Injectable)()
], NotFoundMiddleware);
exports.NotFoundMiddleware = NotFoundMiddleware;
//# sourceMappingURL=not-found.js.map