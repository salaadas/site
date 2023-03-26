import { HtmlRenderer, Parser } from 'commonmark';
import { Post } from "src/types";
const readingTime = require('reading-time');
import { join } from 'path';
import * as matter from 'gray-matter';
import * as fs from 'fs';

// markdown parser/reader/renderer
const reader = new Parser({smart: true});
const writer = new HtmlRenderer();

export const BLOG_FOLDER = 'blog';
export const BLOG_DIR: string = join(__dirname, '..', '..', BLOG_FOLDER);

export const getPosts = (): Post[] => {
    const postFiles: string[] = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'));
    const postContent: matter.GrayMatterFile<string>[] = [];
    for (let file of postFiles) {
        postContent.push(matter.read(join(BLOG_DIR, file)));
    }
    const posts: Post[] = postFiles.map((p: string, i) => {
        const file = matter.read(join(BLOG_DIR, p));
        const parsed = reader.parse(file.content); // AST Node tree
        const rendered = writer.render(parsed); // HTML in form of string

        const read_time = Math.ceil(readingTime(rendered).minutes);
        const frontmatter = postContent[i].data;

        const body = {
            content: rendered,
            data: {
                title: frontmatter.title,
                description: frontmatter.description,
                tags: frontmatter.tags,
                date: frontmatter.date,
                series: frontmatter.series,
                read_time
            },
            formatDate() {
                const parts = this.data.date.split('-');
                return `${parts[0]} M${parts[1]} ${parts[2]}`; // YYYY MM DD
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