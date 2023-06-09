import { Injectable } from "@nestjs/common";
import { HtmlRenderer, Parser } from "commonmark";
import * as fs from 'fs';
import * as path from "path";

@Injectable()
export class TweetsService {
    renderTweets() {
        const reader = new Parser({smart: true});
        const writer = new HtmlRenderer();

        const TWEETS_DIR = path.join(process.cwd(), 'tweets');
        const rawTweets = fs.readdirSync(TWEETS_DIR).filter(file => file.endsWith('.md'));
        const parsedTweets = rawTweets.map(t => {
            const content = fs.readFileSync(`${path.join(TWEETS_DIR, t)}`, {encoding: 'utf8'});
            const ast = reader.parse(content);
            const html = writer.render(ast);

            const res = {
                date: t,
                content: html
            };

            return res;
        });

        return parsedTweets;
    }
}
