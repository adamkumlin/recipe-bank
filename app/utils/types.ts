export type SearchResult = {
    id: number;
    key: string;
    title: string;
    excerpt: string;
    description: string;
    thumbnail: Thumbnail;
}

type Thumbnail = {
    mimetype: string;
    size: number;
    width: number;
    height: number;
    duration: number;
    url: string;
}