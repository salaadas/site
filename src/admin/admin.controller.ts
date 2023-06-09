import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import { LoginDto } from "./dto/login.dto";

import * as fs from "fs";
import * as path from "path";

@Controller('admin')
export class AdminController {
    authorized = true;

    constructor (private readonly AdminServices: AdminService) {
    }

    @Get()
    showForm(@Res() res: Response) {
        return res.render('post_tweets');
        // if (this.authorized) {
        //     return res.render('post-tweets');
        // } else {
        //     return res.render('login');
        // }
    }

    @Post()
    login(@Body() loginDto: LoginDto, @Res() res: Response, @Req() req: Request) {
        // if (this.AuthServices.validate(loginDto)) {
            
        // }
        
        const time = new Date().toISOString();
        console.log('time:', time);
        const writePath: string = path.join(process.cwd(), `tweets/${time}.md`);
        console.log('log path:', writePath);

        const appendContent: string = `${req.body.input}`.replace(/\r/g, '');
        fs.writeFile(writePath, appendContent, (err) => {
            if (err)
                console.error(err.message);
        });

        res.redirect('/admin');
    }
}
