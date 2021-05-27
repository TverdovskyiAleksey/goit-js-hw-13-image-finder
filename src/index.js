import './sass/main.scss';
import hitsTpl from './templates/hits.hbs';
import CardApiService from './apiService';
import { debounce } from 'lodash';
import * as basicLightbox from 'basiclightbox';

const searchForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.btn');
const articlesContainer = document.querySelector('.gallery');
const cardApiService = new CardApiService();

searchForm.addEventListener('input', debounce(onSearch, 500));
loadMoreBtn.addEventListener('click', onLoadMore);
articlesContainer.addEventListener('click', onClick);

function onSearch(e) {
    e.preventDefault();

    clearHitsContainer()
    cardApiService.query = e.target.value;
    cardApiService.resetPage();
    cardApiService.fetchArticles().then(appendArticlesMarkup);
}

function onLoadMore() {
    cardApiService.fetchArticles().then(appendArticlesMarkup);
}

function appendArticlesMarkup(hits) {
    articlesContainer.insertAdjacentHTML('beforeend', hitsTpl(hits));
    articlesContainer.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});
}

function clearHitsContainer() {
    articlesContainer.innerHTML = '';
}

function onClick(e) {
    if (e.target.nodeName !== "IMG") {
        return;
    }
    const ref = e.target.dataset.ref;
    const instance = basicLightbox.create(`<img src='${ref}' alt='${1}'>`).show();
}