import { Controller, Get, Render } from "@nestjs/common";
import { TweetsService } from './tweets.service'

@Controller('tweets')
export class TweetsController {
    constructor (private readonly TweetsServices: TweetsService) {
    }

    @Get()
    @Render('tweets_index')
    showTweets() {
        const tweets = this.TweetsServices.renderTweets();

        return {
            title: 'Tweets',
            tweets: tweets.reverse()
        };
    }
}
