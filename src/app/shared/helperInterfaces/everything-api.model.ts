import { ApiArticle } from './apiArticle.model';

export interface ApiResponse {
    status: string;
    totalResults: number;
    articles: ApiArticle[]
}

