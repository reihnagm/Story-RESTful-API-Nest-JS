import { ArgumentsHost, ExceptionFilter, InternalServerErrorException } from "@nestjs/common";
export declare class InternalServerErrorExceptionFilter implements ExceptionFilter {
    catch(exception: InternalServerErrorException, host: ArgumentsHost): void;
}
