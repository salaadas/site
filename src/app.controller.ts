import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Contact } from './types';
import { salaadas } from './consts'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    @Render('home')
    home() {
        console.log('my name', process.env.ADMIN_NAME);
        console.log('my password', process.env.ADMIN_KEY);

        return {
            salaadas
        };
    }

    @Get('contact')
    @Render('contact')
    contact(): Contact {
        return {
            title: 'Contact Information',
        };
    }

    @Get('faq')
    @Render('faq')
    faq() {
        return {
            title: 'Frequently Asked Questions',
        };
    }

    @Get('resume')
    @Render('resume')
    resume() {
        return {};
    }
}
