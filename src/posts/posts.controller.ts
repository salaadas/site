import { Controller, Render, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
import { join } from 'path';
import { state } from "src/app/config";
import { getPosts, BLOG_FOLDER } from ".";

@Controller('blogs')
export class PostsController {
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
            return {
                posts: (state.blog = getPosts()),
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


    @Get(':article')
    @Render('blog')
    post(@Param('article') article: string) {
        const post = state.blog.find(p => p.file_name === article);
        if (!post) {
            throw new Error(`Cannot find post: ${article}`);
        }

        const frontmatter = post.body.data;
        if (!frontmatter) {
            throw new Error (`No metadata available for post: ${article}`);
        }
        
        const content = post.body.content;
        if (!content) {
            throw new Error (`No content for post: ${article}`);
        }
        
        return {
            title: frontmatter.title,
            description: frontmatter.description,
            date: post.body.formatDate(),
            tags: frontmatter.tags,
            read_time: frontmatter.read_time,
            series: frontmatter.series,
            link: `${join(BLOG_FOLDER), post.file_name}`,
            content,
        };
    }

    @Get('/series')
    @Render('post-series')
    series() {
        return {
            title: 'Blogposts by series',
            series: '',
        };
    }
}
