import {
    Controller, Get, Req,
    Post, HttpCode, Header,
    Redirect, Query, Param
} from '@nestjs/common';
import { Request } from 'express'

@Controller('cats')
export class CatsController {
    @Post()
    @HttpCode(204 | 200)
    @Header('Caching', 'none')
    create(): string {
        return 'This action adds a new cat';
    }

    @Get()
    findAll(@Req() request: Request): string {
        return 'This action returns all cats';
    }

    @Get(':id')
    findOne(@Param('id') id: string): string {
        console.log(id);
        return `This action returns the #${id} cat`;
    }

    @Get('docs')
    @Redirect('https://docs.nestjs.com', 203)
    getDocs(@Query('version') version: string) {
        if (version && version === '5') {
            return {url: 'https://docs.nestjs.com/v5'};
        }
    }
}
