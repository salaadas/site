type Contact = {
    title: string;
    links?: string[];
};

type Author = {
    name: string;
    job_title: string;
};

type Post = {
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

export { Contact, Post, Author };
