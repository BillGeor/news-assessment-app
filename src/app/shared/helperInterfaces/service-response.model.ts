import { Article } from './news.model';

export interface ServiceResponse {
    totalResults: number;
    articles: Article[];
    error: string;
}
