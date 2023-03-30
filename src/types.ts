type Contact = {
    title: string;
    links?: string[];
};

type Author = {
    name: string;
    job_title: string;
};

type Post = {
    file_name: string;
    body: {
        content: string;
        data: {
            title: string;
            description: string;
            date: string;
            read_time: number;
            tags?: string[];
            series?: string;
        };
        formatDate(): string;
    };
};

type Series_Desc = {
    name: string;
    details: string;
};

type Config = {
    port: number;
    series_descriptions: Series_Desc[];
};

type State = {
    cfg: Config;
    blog: Post[];
};

export { Contact, Post, Author, State, Config, Series_Desc };
