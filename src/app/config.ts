import { State, Post } from "src/types";
import { getPosts, hello } from "src/posts/posts.controller";

const init = (): State => {
    let cfg = {
        port: 3000,
        series_descriptions: [{name: '', details: ''}]
    };

    let blog: Post[] = [];

    return {
        cfg,
        blog
    };
}

const state: State = init();

export { state }
