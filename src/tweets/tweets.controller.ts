import { Controller, Get, Post, Res } from "@nestjs/common";
import { Response } from "express";
@Controller('tweets')
export class TweetsController {
    @Get()
    login(@Res() res: Response) {
        return 'hello world';
    }
}
