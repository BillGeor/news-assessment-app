import { ApiArticle } from './apiArticle.model';

export interface ApiRes {
    status: string;
    totalResults: number;
    articles: ApiArticle[]
}