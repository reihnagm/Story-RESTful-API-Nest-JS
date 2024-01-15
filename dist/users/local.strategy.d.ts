import { Strategy } from 'passport-local';
import { UsersService } from './users.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: UsersService);
}
export {};
