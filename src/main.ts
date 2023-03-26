import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { state } from './app/config';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useStaticAssets(join(__dirname, '..', 'static')); // for static assets
    app.setBaseViewsDir(join(__dirname, '..', 'templates')); // for view engine templates
    app.setViewEngine('pug');

    await app.listen(state.cfg.port);
}
bootstrap();
