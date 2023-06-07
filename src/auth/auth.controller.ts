import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";

import { LoginDto } from "./dto/login.dto";

@Controller('admin')
export class AuthController {
    constructor (private readonly AuthServices: AuthService) {
    }

    @Get()
    showForm(@Res() res: Response) {
        return res.render('login');
    }

    @Post()
    login(@Body() loginDto: LoginDto, @Res() res: Response) {
        if (this.AuthServices.validate(loginDto)) {
            console.log('hihihihih');
        }
        res.redirect('/admin');
    }
}
