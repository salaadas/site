import { Controller, Render, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
import * as matter from 'gray-matter';
import * as fs from 'fs';
import { join } from 'path';
import { HtmlRenderer, Parser } from 'commonmark';

// markdown parser/reader/renderer
const reader = new Parser({smart: true});
const writer = new HtmlRenderer();

// type Frontmatter = {
//     title: string;
//     description: string;
//     date: string;
//     tags: string[];
//     read_time_estimate_minutes: string;
// };

const BLOG_DIR: string = join(__dirname, '../..', 'blog');

const getBlogs = () => {
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


    @Get(':article')
    @Render('blog')
    readBlog(@Param('article') article: string) {
        console.log(join(BLOG_DIR, article + '.md'));
        const file = matter.read(join(BLOG_DIR, article + '.md'));
        const parsed = reader.parse(file.content);
        const rendered = writer.render(parsed);

        return {
            title: file.data.title,
            description: file.data.description,
            date: file.data.date,
            tags: file.data.tags,
            read_time_estimate_minutes: file.data.read_time_estimate_minutes,
            content: rendered
        };
    }
}
