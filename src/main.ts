import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { ErrorsFilter } from './errors.filter';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useGlobalFilters(new ErrorsFilter());
    app.useStaticAssets(join(__dirname, '..', 'static')); // for static assets
    app.setBaseViewsDir(join(__dirname, '..', 'templates')); // for view engine templates
    app.setViewEngine('pug');

    await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
