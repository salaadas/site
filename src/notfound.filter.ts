import { ArgumentsHost, Catch, ExceptionFilter, HttpException, NotFoundException, Render } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    @Render('not_found')
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest<Request>();
        const res = ctx.getResponse<Response>();

        return res.render('not_found', {title: 'Not found', path: req.url});
    }
}
