import { Controller, Render, Get, HttpException, HttpStatus } from "@nestjs/common";
import * as matter from 'gray-matter'
import * as fs from 'fs'
import { join } from 'path'

type Frontmatter = {
    title: string;
    file_name: string;
    description: string;
    date: string;
    tags: string[];
    "estimate-read-time": string;
};

const getBlogs = () => {
    const BLOG_DIR: string = join(__dirname, '../..', 'blog');
    const blogFiles: string[] = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'));
    const blogContent: matter.GrayMatterFile<string>[] = [];
    for (let file of blogFiles) {
        blogContent.push(matter.read(join(BLOG_DIR, file)));
    }
    const blogs = blogFiles.map((blog, i) => {
        return {
            file_name: blog.replace('.md', ''), // remove .md extension
            body: blogContent[i] // content of markdown file after parsed
        };
    });

    // TODO: sorts blog according to date (latest to oldest)

    return blogs;
}

@Controller('blogs')
export class BlogsController {
    @Get()
    @Render('listblogs')
    index() {
        try {
            // EXAMPLE:
            // 
            // blogs[i] = {
            //     file_name: 'abcxyz',
            //     body: {
            //         content: '<h1>...</h1>',
            //         data: {title: '...', description: '...', ...}
            //     }
            // }
            //
            return {
                blogs: getBlogs()
            };
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Oops! Something went wrong!',
                error: error.message
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/:article')
    @Render('blog')
    readBlog()
}
