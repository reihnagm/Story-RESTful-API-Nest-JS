import { NestMiddleware } from "@nestjs/common";
import { Request } from 'express';
export declare class NotFoundMiddleware implements NestMiddleware {
    use(req: Request, res: any, next: () => void): void;
}
