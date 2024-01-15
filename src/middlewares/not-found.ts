import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Router } from 'express';

@Injectable()
export class NotFoundMiddleware implements NestMiddleware {

  use(req: Request, res: any, next: () => void) {
    const requestedUrl = req.baseUrl

    const router = req.app._router as Router;
   
    var allPath = router.stack
    .map(layer => {
      if(layer.route) {
        const path = layer.route?.path;
        // METHOD
        // const method = layer.route?.stack[0].method;
        return `${path}`
      }
    }).filter(item => item !== undefined)

    var checkRoute = allPath.includes(requestedUrl)

    if(checkRoute) {
      next()
    } else {
      res
      .status(404)
      .json({
        status: 404,
        error: true,
        message: 'Not found',
      });
    }
  }
}