import { NestMiddleware } from "@nestjs/common";
export declare class NotFoundMiddleware implements NestMiddleware {
    use(_: any, res: any, _next: () => void): void;
}
