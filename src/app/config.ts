import { State, Post } from "src/types";
import { getPosts } from "src/posts";

const init = (): State => {
    let cfg = {
        port: 3000,
        series_descriptions: [{name: '', details: ''}]
    };

    let blog: Post[] = getPosts();

    return {
        cfg,
        blog
    };
}

const state: State = init();

export { state }
