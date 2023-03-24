import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

type Contact = {
    title: string;
    links?: string[];
}

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    @Render('base')
    home() {
        return {
            content: 'Hello world',
            styles: 'home.css'
        };
    }

    @Get('contact')
    @Render('contact')
    contact(): Contact {
        return {
            title: 'Contact Information',
        };
    }
}
