export class Article {
    constructor(
        public title: string, 
        public description: string,
        public img: string,
        public category: string
    ) {
        this.title = title;
        this.description = description;
        this.img = img;
        this.category = category;
    }
}