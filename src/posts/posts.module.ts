import {  Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";

@Module({
    imports: [
        CloudinaryModule
    ],
    controllers: [PostsController],
    providers: [
        PostsService,
        {
            provide: 'POSTS',
            useValue: []
        },
        {
            provide: 'SERIES_DESCS',
            useValue: []
        }
    ]
})
export class PostsModule {
}
