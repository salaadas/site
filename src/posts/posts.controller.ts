import { Controller, Render, Get, HttpException, HttpStatus, Param, NotFoundException } from "@nestjs/common";
import { join } from 'path';
import { Series_Desc } from "src/types";
import { PostsService, BLOG_FOLDER } from "./posts.service";

const series_descs: Series_Desc[] = [
    {
        name: 'fuck-the-world',
        details: 'testing out series feature'
    }
];


@Controller('blogs')
export class PostsController {
    constructor (private readonly PostsServices: PostsService) {
        this.PostsServices.init();
    }

    @Get()
    @Render('post_index')
    index() {
        try {
            // EXAMPLE:
            // 
            // posts[i] = {
            //     file_name: 'abcxyz',
            //     body: {
            //         content: '<h1>...</h1>',
            //         data: {title: '...', description: '...', ...}
            //     }
            // }
            //
            this.PostsServices.init();
            return {
                posts: this.PostsServices.getAll(),
                title: 'Blogposts',
                show_extra: true,
                today: new Date()
            };
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Oops! Something went wrong!',
                error: error.message
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/series')
    @Render('post_series')
    series() {
        return {
            title: 'Blogposts by series',
            series: series_descs,
        };
    }

    @Get('/series/:series')
    @Render('series_view')
    series_view(@Param('series') series: string) {
        const post_series = this.PostsServices.series_view(series_descs, series);
        return { posts: post_series.posts, desc: post_series.desc, title: `${series} posts` };
    }

    @Get(':article')
    @Render('blog')
    post(@Param('article') article: string) {
        const post = this.PostsServices.getAll().find(p => p.file_name === article);
        if (!post) {
            throw new NotFoundException(`Cannot find post: ${article}`);
        }

        const frontmatter = post.body.data;
        if (!frontmatter) {
            throw new NotFoundException(`No metadata available for post: ${article}`);
        }
        
        const content = post.body.content;
        if (!content) {
            throw new NotFoundException(`No content for post: ${article}`);
        }
        
        return {
            title: frontmatter.title,
            description: frontmatter.description,
            date: post.body.formatDate(),
            tags: frontmatter.tags,
            read_time: frontmatter.read_time,
            series: frontmatter.series,
            content,
        };
    }
}
