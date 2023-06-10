import { Body, Controller, Get, Post, Render, Req, Res, Session } from "@nestjs/common";
import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import { LoginDto } from "./dto/login.dto";

import * as fs from "fs";
import * as path from "path";

@Controller('admin')
export class AdminController {
    authorized = false;

    constructor (private readonly AdminServices: AdminService) {
    }

    @Get('login')
    @Render('login')
    showLogin(@Res() res: Response, @Session() session: {key?: string})
    {
        if (session.key && this.AdminServices.verifyCookie(session.key)) {
            res.redirect('/admin')
        }
    }
        
    @Post('login')
    login(@Body() loginDto: LoginDto, @Res() res: Response, @Session() session: {key?: string}) {
        const cookie: string = this.AdminServices.validate(loginDto);
        if (cookie) {
            session.key = cookie;
            res.redirect('/admin');
        } else {
            res.redirect('/admin/login');
        }
    }

    @Get()
    showForm(@Session() session: {key?: string}, @Res() res: Response) {
        if (!session.key || !this.AdminServices.verifyCookie(session.key)) {
            res.redirect('/admin/login');
        }

        return res.render('post_tweets');
    }

    @Post()
    postTweet(@Session() session: {key?: string}, @Res() res: Response, @Req() req: Request) {
        if (!session.key || !this.AdminServices.verifyCookie(session.key)) {
            res.redirect('/admin/login');
        }

        const time = new Date().toISOString();
        const writePath: string = path.join(process.cwd(), `tweets/${time}.md`);

        const appendContent: string = `${req.body.input}`.replace(/\r/g, '');
        fs.writeFile(writePath, appendContent, (err) => {
            if (err)
                console.error(err.message);
        });
        res.redirect('/admin');
    }
}
