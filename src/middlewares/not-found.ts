import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request } from 'express';


// import { RouteParamMetadata } from "@nestjs/common";

@Injectable()
export class NotFoundMiddleware implements NestMiddleware {
  // constructor(private readonly routerExplorer: RouteParamMetadata) {}
  
  use(req: Request, res: any, next: () => void) {
    // var routes: Routes;
    // const requestedUrl = req.baseUrl
 
    next()

    // const exists = routes.some((route: { path: any; }) => route.path === requestedPath);

    // if (exists) {
    //   next();
    // } else {
    //   res.status(404).json({ message: 'Route not found' });
    // }
  }
}

// import { RoutesMapper } from "@nestjs/core/middleware/routes-mapper";

// @Injectable()
// export class RoutesMapperService {
//   constructor(private readonly routerExplorerService: RoutesMapper) {}

//   getAllPaths(path: string) {
//     const routes = this.routerExplorerService.mapRouteToRouteInfo(path);

//     return routes;
//   }
// }