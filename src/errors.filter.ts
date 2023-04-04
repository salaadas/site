import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Render } from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class ErrorsFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest<Request>();
        const res = ctx.getResponse<Response>();
        const status = (exception instanceof HttpException) ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        if (status === HttpStatus.NOT_FOUND)
            return res.status(status).render('not_found', {title: 'Not found', path: req.url});
        if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
            return res.status(status).render('internal_error', {title: 'Internal Server Error', path: req.url});
        }
    }
}
