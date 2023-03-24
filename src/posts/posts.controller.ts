import { Controller, Render, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
import * as matter from 'gray-matter';
import * as fs from 'fs';
import { join } from 'path';
import { HtmlRenderer, Parser } from 'commonmark';
const readingTime = require('reading-time');

// markdown parser/reader/renderer
const reader = new Parser({smart: true});
const writer = new HtmlRenderer();

type Post = {
    content: string,
    data: {
        title: string;
        description: string;
        date: string;
        tags: string[];
        read_time: number;
    },
    formatDate(): string
};

const BLOG_DIR: string = join(__dirname, '../..', 'blog');

const getPosts = () => {
    const postFiles: string[] = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'));
    const postContent: matter.GrayMatterFile<string>[] = [];
    for (let file of postFiles) {
        postContent.push(matter.read(join(BLOG_DIR, file)));
    }
    const posts = postFiles.map((p: string, i) => {
        const file = matter.read(join(BLOG_DIR, p));
        const parsed = reader.parse(file.content); // AST Node tree
        const rendered = writer.render(parsed); // HTML in form of string

        const read_time = Math.ceil(readingTime(rendered).minutes);
        const frontmatter = postContent[i].data;

        const body: Post = {
            content: rendered,
            data: {
                title: frontmatter.title,
                description: frontmatter.description,
                tags: frontmatter.tags,
                date: frontmatter.date,
                read_time
            },
            formatDate() {
                const parts = this.data.date.split('-');
                return `${parts[2]} M${parts[1]} ${parts[0]}`;
            }
        };

        return {
            file_name: p.replace('.md', ''), // file name of current post
            body // contains metadata and parsed markdown of current post
        };
    });

    // TODO: sorts blog according to date (latest to oldest)
    posts.sort((a, b) => {
        const dateA = new Date(a.body.data.date);
        const dateB = new Date(b.body.data.date);

        return dateB.getTime() - dateA.getTime();
    });

    return posts;
}

// All posts of the site
let all_posts = getPosts(); 

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
                posts: (all_posts = getPosts()),
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
        console.log(`Rendering: ${article}.md`);

        const post = all_posts.find(p => p.file_name === article);
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
            content
        };
    }
}
