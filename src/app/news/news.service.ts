import { Subject } from 'rxjs';
import { Article } from './../shared/news.model';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class NewsService {
    articlesChanged = new Subject<Article[]>();
    startedEditing = new Subject<number>();
    
    private articles: Article[] = [
        new Article(
            "ABC News (AU)",
            "Australia's most trusted source of local, national, and world news. Comperhensive independent, in-depth analysis, the latest business, sport, weather and more.",
            "https://lh3.googleusercontent.com/Yq_3YOVf7Il2E4nLu8a0sKPsz5gvpWu9yOX9WA6dJoX45B1zlq_kqLBwNdCnINLDxlc=s180-rw",
            "General"
        ),
        new Article(
            "ABC News (AU)",
            "Australia's most trusted source of local, national, and world news. Comperhensive independent, in-depth analysis, the latest business, sport, weather and more.",
            "https://lh3.googleusercontent.com/Yq_3YOVf7Il2E4nLu8a0sKPsz5gvpWu9yOX9WA6dJoX45B1zlq_kqLBwNdCnINLDxlc=s180-rw",
            "General"
        ),
        new Article(
            "ABC News (AU)",
            "Australia's most trusted source of local, national, and world news. Comperhensive independent, in-depth analysis, the latest business, sport, weather and more.",
            "https://lh3.googleusercontent.com/Yq_3YOVf7Il2E4nLu8a0sKPsz5gvpWu9yOX9WA6dJoX45B1zlq_kqLBwNdCnINLDxlc=s180-rw",
            "General"
        ),
        new Article(
            "ABC News (AU)",
            "Australia's most trusted source of local, national, and world news. Comperhensive independent, in-depth analysis, the latest business, sport, weather and more.",
            "https://lh3.googleusercontent.com/Yq_3YOVf7Il2E4nLu8a0sKPsz5gvpWu9yOX9WA6dJoX45B1zlq_kqLBwNdCnINLDxlc=s180-rw",
            "General"
        ),
        new Article(
            "ABC News (AU)",
            "Australia's most trusted source of local, national, and world news. Comperhensive independent, in-depth analysis, the latest business, sport, weather and more.",
            "https://lh3.googleusercontent.com/Yq_3YOVf7Il2E4nLu8a0sKPsz5gvpWu9yOX9WA6dJoX45B1zlq_kqLBwNdCnINLDxlc=s180-rw",
            "General"
        ),
        new Article(
            "ABC News (AU)",
            "Australia's most trusted source of local, national, and world news. Comperhensive independent, in-depth analysis, the latest business, sport, weather and more.",
            "https://lh3.googleusercontent.com/Yq_3YOVf7Il2E4nLu8a0sKPsz5gvpWu9yOX9WA6dJoX45B1zlq_kqLBwNdCnINLDxlc=s180-rw",
            "General"
        ),
        new Article(
            "ABC News (AU)",
            "Australia's most trusted source of local, national, and world news. Comperhensive independent, in-depth analysis, the latest business, sport, weather and more.",
            "https://lh3.googleusercontent.com/Yq_3YOVf7Il2E4nLu8a0sKPsz5gvpWu9yOX9WA6dJoX45B1zlq_kqLBwNdCnINLDxlc=s180-rw",
            "General"
        ),
        new Article(
            "ABC News (AU)",
            "Australia's most trusted source of local, national, and world news. Comperhensive independent, in-depth analysis, the latest business, sport, weather and more.",
            "https://lh3.googleusercontent.com/Yq_3YOVf7Il2E4nLu8a0sKPsz5gvpWu9yOX9WA6dJoX45B1zlq_kqLBwNdCnINLDxlc=s180-rw",
            "General"
        ),
        new Article(
            "ABC News (AU)",
            "Australia's most trusted source of local, national, and world news. Comperhensive independent, in-depth analysis, the latest business, sport, weather and more.",
            "https://lh3.googleusercontent.com/Yq_3YOVf7Il2E4nLu8a0sKPsz5gvpWu9yOX9WA6dJoX45B1zlq_kqLBwNdCnINLDxlc=s180-rw",
            "General"
        ),
        new Article(
            "ABC News (AU)",
            "Australia's most trusted source of local, national, and world news. Comperhensive independent, in-depth analysis, the latest business, sport, weather and more.",
            "https://lh3.googleusercontent.com/Yq_3YOVf7Il2E4nLu8a0sKPsz5gvpWu9yOX9WA6dJoX45B1zlq_kqLBwNdCnINLDxlc=s180-rw",
            "General"
        ),
        new Article(
            "ABC News (AU)",
            "Australia's most trusted source of local, national, and world news. Comperhensive independent, in-depth analysis, the latest business, sport, weather and more.",
            "https://lh3.googleusercontent.com/Yq_3YOVf7Il2E4nLu8a0sKPsz5gvpWu9yOX9WA6dJoX45B1zlq_kqLBwNdCnINLDxlc=s180-rw",
            "General"
        ),
        new Article(
            "ABC News (AU)",
            "Australia's most trusted source of local, national, and world news. Comperhensive independent, in-depth analysis, the latest business, sport, weather and more.",
            "https://lh3.googleusercontent.com/Yq_3YOVf7Il2E4nLu8a0sKPsz5gvpWu9yOX9WA6dJoX45B1zlq_kqLBwNdCnINLDxlc=s180-rw",
            "General"
        ),
        new Article(
            "ABC News (AU)",
            "Australia's most trusted source of local, national, and world news. Comperhensive independent, in-depth analysis, the latest business, sport, weather and more.",
            "https://lh3.googleusercontent.com/Yq_3YOVf7Il2E4nLu8a0sKPsz5gvpWu9yOX9WA6dJoX45B1zlq_kqLBwNdCnINLDxlc=s180-rw",
            "General"
        ),
        new Article(
            "ABC News (AU)",
            "Australia's most trusted source of local, national, and world news. Comperhensive independent, in-depth analysis, the latest business, sport, weather and more.",
            "https://lh3.googleusercontent.com/Yq_3YOVf7Il2E4nLu8a0sKPsz5gvpWu9yOX9WA6dJoX45B1zlq_kqLBwNdCnINLDxlc=s180-rw",
            "General"
        ),
        new Article(
            "ABC News (AU)",
            "Australia's most trusted source of local, national, and world news. Comperhensive independent, in-depth analysis, the latest business, sport, weather and more.",
            "https://lh3.googleusercontent.com/Yq_3YOVf7Il2E4nLu8a0sKPsz5gvpWu9yOX9WA6dJoX45B1zlq_kqLBwNdCnINLDxlc=s180-rw",
            "General"
        ),
        new Article(
            "ABC News (AU)",
            "Australia's most trusted source of local, national, and world news. Comperhensive independent, in-depth analysis, the latest business, sport, weather and more.",
            "https://lh3.googleusercontent.com/Yq_3YOVf7Il2E4nLu8a0sKPsz5gvpWu9yOX9WA6dJoX45B1zlq_kqLBwNdCnINLDxlc=s180-rw",
            "General"
        ),
        new Article(
            "ABC News (AU)",
            "Australia's most trusted source of local, national, and world news. Comperhensive independent, in-depth analysis, the latest business, sport, weather and more.",
            "https://lh3.googleusercontent.com/Yq_3YOVf7Il2E4nLu8a0sKPsz5gvpWu9yOX9WA6dJoX45B1zlq_kqLBwNdCnINLDxlc=s180-rw",
            "General"
        ),
        new Article(
            "ABC News (AU)",
            "Australia's most trusted source of local, national, and world news. Comperhensive independent, in-depth analysis, the latest business, sport, weather and more.",
            "https://lh3.googleusercontent.com/Yq_3YOVf7Il2E4nLu8a0sKPsz5gvpWu9yOX9WA6dJoX45B1zlq_kqLBwNdCnINLDxlc=s180-rw",
            "General"
        )
    ];

    /**
     * Only gets a copy, not the reference of ingredients
     */
    getArticles() {
        return this.articles.slice();
    }

    getArticle(index: number) {
        return this.articles[index];
    }

    addArticles(ingredient: Article) {
        this.articles.push(ingredient);
        this.articlesChanged.next(this.getArticles());
    }

    updateArticle(index: number, newIngredient: Article) {
        this.articles[index] = newIngredient;
        this.articlesChanged.next(this.articles.slice());
    }

    deleteArticle(index: number) {
        this.articles.splice(index, 1);
        this.articlesChanged.next(this.articles.slice());
    }

    addMultipleArticles(articles: Article[]) {
        this.articles.push(...articles);
        this.articlesChanged.next(this.getArticles());
    }
    
}