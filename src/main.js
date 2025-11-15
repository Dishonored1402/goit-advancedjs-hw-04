import './css/styles.css';
import { fetchImages } from './js/pixabay-api';
import { renderImages, clearGallery } from './js/render-functions';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('.load-more');
const loaderEl = document.querySelector('.loader');
const endMessageEl = document.querySelector('.end-message');

const PER_PAGE = 15;

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;
let isLoading = false;

searchForm.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSearch(event) {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    window.alert('Please enter a search term.');
    return;
  }

  currentQuery = query;
  currentPage = 1;
  totalHits = 0;

  clearGallery();
  hideLoadMore();
  hideEndMessage();

  await loadImages();
}

async function handleLoadMore() {
  if (isLoading) {
    return;
  }

  await loadImages();
}

async function loadImages() {
  if (!currentQuery) {
    return;
  }

  isLoading = true;
  showLoader();
  hideEndMessage();

  try {
    const data = await fetchImages(currentQuery, currentPage, PER_PAGE);
    const { hits, totalHits: apiTotalHits } = data;

    if (currentPage === 1) {
      totalHits = apiTotalHits || 0;
    }

    if (!hits.length) {
      if (currentPage === 1) {
        window.alert('Sorry, there are no images matching your search query. Please try again.');
      }
      hideLoader();
      hideLoadMore();
      return;
    }

    renderImages(hits);

    const loadedItems = document.querySelectorAll('.gallery-item').length;

    if (loadedItems >= totalHits) {
      hideLoadMore();
      showEndMessage();
    } else {
      showLoadMore();
    }

    if (currentPage > 1) {
      smoothScroll();
    }

    currentPage += 1;
  } catch (error) {
    console.error(error);
    window.alert('Something went wrong. Please try again later.');
  } finally {
    hideLoader();
    isLoading = false;
  }
}

function showLoader() {
  loaderEl.classList.remove('is-hidden');
}

function hideLoader() {
  loaderEl.classList.add('is-hidden');
}

function showLoadMore() {
  loadMoreBtn.classList.remove('is-hidden');
}

function hideLoadMore() {
  loadMoreBtn.classList.add('is-hidden');
}

function showEndMessage() {
  endMessageEl.classList.remove('is-hidden');
}

function hideEndMessage() {
  endMessageEl.classList.add('is-hidden');
}

function smoothScroll() {
  const firstCard = document.querySelector('.gallery-item');

  if (!firstCard) {
    return;
  }

  const cardHeight = firstCard.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
