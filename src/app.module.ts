import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MorganMiddleware } from '@nest-middlewares/morgan';
import { join } from 'path'

import { PostsModule } from './posts';


@Module({
    imports: [
        PostsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // IMPORTANT! Call Middleware.configure BEFORE using it for routes
        MorganMiddleware.configure('common');
        consumer
            .apply(MorganMiddleware)
            .forRoutes('*'); // apply logging globally
    }    
}
