import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryList = document.querySelector('.gallery');
let lightboxInstance = null;

export function clearGallery() {
  if (galleryList) {
    galleryList.innerHTML = '';
  }
}

export function renderImages(images) {
  if (!galleryList || !images.length) return;

  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img
            class="gallery-image"
            src="${webformatURL}"
            alt="${tags}"
            loading="lazy"
          />
        </a>
        <div class="gallery-info">
          <p><span>Likes</span>${likes}</p>
          <p><span>Views</span>${views}</p>
          <p><span>Comments</span>${comments}</p>
          <p><span>Downloads</span>${downloads}</p>
        </div>
      </li>`
    )
    .join('');

  galleryList.insertAdjacentHTML('beforeend', markup);

  if (!lightboxInstance) {
    lightboxInstance = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightboxInstance.refresh();
  }
}
