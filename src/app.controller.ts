import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

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
}
