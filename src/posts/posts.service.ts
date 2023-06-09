import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { Post, Series_Desc } from "src/types";
import { join } from 'path';
import * as matter from 'gray-matter';
import * as fs from 'fs';
import { HtmlRenderer, Parser } from 'commonmark';
const readingTime = require('reading-time');

import { parse } from 'node-html-parser';

// markdown parser/reader/renderer
const reader = new Parser({smart: true});
const writer = new HtmlRenderer();

export const BLOG_FOLDER = 'blog';
export const BLOG_DIR: string = join(process.cwd(), BLOG_FOLDER);

@Injectable()
export class PostsService {
    constructor(
        private cloudinary: CloudinaryService,
        @Inject('POSTS') private posts: Post[],
    ) {}

    async uploadImageToCloudinary(file: Express.Multer.File) {
        return await this.cloudinary.uploadImage(file).catch(() => {
            throw new BadRequestException('Invalid file type');
        });
    }

    loadPosts(): Post[] {
        const postFiles: string[] = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'));
        const postContent: matter.GrayMatterFile<string>[] = [];
        for (let file of postFiles) {
            postContent.push(matter.read(join(BLOG_DIR, file)));
        }
        const posts: Post[] = postFiles.map((p: string, i) => {
            const file = matter.read(join(BLOG_DIR, p));
            const parsed = reader.parse(file.content); // AST Node tree
            let rendered = writer.render(parsed); // HTML in form of string

            const dom = parse(rendered);
            // Hero
            const CDN_PREFIX = 'https://res.cloudinary.com/dys56nlen/image/upload/';
            dom.getElementsByTagName('salaadas-hero').forEach(el => {
                el.parentNode.tagName = 'figure';
                el.parentNode.setAttributes({
                    class: 'hero',
                    style: 'margin:0'
                });

                el.parentNode.appendChild(parse(`
<picture style="margin:0">
    <source type="image/avif" srcset=${CDN_PREFIX + 'f_avif,q_auto/hero/' + el.getAttribute('file')}>
    <source type="image/webp" srcset=${CDN_PREFIX + 'f_auto/hero/' + el.getAttribute('file')}>
    <img style="padding:0" loading="lazy" alt="hero image ${el.getAttribute('file')}" src=${CDN_PREFIX + 'hero/' + el.getAttribute('file')}>
</picture>
<figcaption>
    Image generate by ${el.getAttribute('ai')} -- ${el.getAttribute('prompt')}
</figcaption>
`));
                el.parentNode.parentNode.appendChild(parse(`<p></p>`));
                el.remove();
            });

            // Images
            dom.getElementsByTagName('salaadas-img').forEach(el => {
                el.parentNode.appendChild(parse(`
<a href=${CDN_PREFIX + el.getAttribute('path')} target="_blank">
    <picture class="picture" style="margin:0">
        <source type="image/avif" srcset=${CDN_PREFIX + 'f_avif,q_auto/' + el.getAttribute('path')}>
        <source type="image/webp" srcset=${CDN_PREFIX + 'f_auto/' + el.getAttribute('path')}>
        <img class="picture "style="padding:0" loading="lazy" alt="hero image ${el.getAttribute('path')}" src=${CDN_PREFIX + el.getAttribute('path')}>
    </picture>
</a>
`));
                el.remove();
            });
            
            rendered = dom.toString();

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

        posts.sort((a: Post, b: Post) => {
            const dateA = new Date(a.body.data.date);
            const dateB = new Date(b.body.data.date);
            return dateB.getTime() - dateA.getTime();
        });

        return posts;
    }

    series_view(descs: Series_Desc[], series: string): {posts: Post[]; desc: string} {
        const posts: Post[] = [];
        for (let p of this.getAll()) {
            if (!p.body.data.series) continue;
            if (p.body.data.series != series) continue;

            posts.push(p);
        }

        posts.reverse(); // reverse from oldest to latest
        const desc = descs.find((p) => p.name = series);

        if (posts.length == 0) {
            throw new Error(`Series not found!`);
        } else {
            return {
                posts,
                desc: desc.details
            };
        }
    }
    
    init(): void {
        this.posts = this.loadPosts();
    }

    getAll(): Post[] {
        if (this.posts) {
            return this.posts;
        } else {
            this.init();
            return this.posts;
        }
    }
}
