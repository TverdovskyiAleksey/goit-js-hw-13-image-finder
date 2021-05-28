const PAGE_KEY = '21816911-1420e6eb818d750af174e21f8';
export default class CardApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    
    fetchArticles() {
        return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${PAGE_KEY}`)
            .then(r => r.json())
            .then(data => {
                this.page += 1;
                return data.hits;
            })
            .catch(error =>
                console.log(error, 'error'));
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}

