import { Controller, Get, Render, Res } from "@nestjs/common";
import { TweetsService } from './tweets.service'
import { Response } from "express";

@Controller('tweets')
export class TweetsController {
    constructor (private readonly TweetsServices: TweetsService) {
    }

    @Get()
    @Render('tweets_index')
    showTweets(@Res() res: Response) {
        const tweets = this.TweetsServices.renderTweets();

        return {
            title: 'Tweets',
            tweets: tweets.reverse()
        };
    }
}
