import { openBigPicture } from './big-picture.js';

const PHOTO_RANDOM_AMOUNT = 10;
const containerPhotoMiniature = document.querySelector('.pictures');
const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const filterBlock = document.querySelector('.img-filters');

const compareComments = (photoA, photoB) => (photoB.comments.length - photoA.comments.length);

const compareRandom = () => Math.random() - 0.5;

const renderSimilarPhotos = (similarPhotos, compareFunction, photosAmount) => {
  const listPhotoFragment = document.createDocumentFragment();
  const allPhotos = document.querySelectorAll('.picture');
  similarPhotos
    .slice()
    .sort(compareFunction)
    .slice(0, photosAmount)
    .forEach(({ id, url, likes, comments, description }) => {
      const photoElement = similarPhotoTemplate.cloneNode(true);
      photoElement.querySelector('.picture__img').src = url;
      photoElement.querySelector('.picture__img').alt = description;
      photoElement.querySelector('.picture__likes').textContent = likes;
      photoElement.querySelector('.picture__comments').textContent = comments.length;
      photoElement.setAttribute('data-id', id);
      photoElement.addEventListener('click', () => {
        openBigPicture({ id, url, likes, comments, description });
      });
      listPhotoFragment.appendChild(photoElement);
    });
  filterBlock.classList.remove('img-filters--inactive');
  allPhotos?.forEach((photo) => photo.remove());
  containerPhotoMiniature.appendChild(listPhotoFragment);
};

const form = filterBlock.querySelector('.img-filters__form');

const filterFunctions = {
  default: renderSimilarPhotos,
  random: (photos) => renderSimilarPhotos(photos, compareRandom, PHOTO_RANDOM_AMOUNT),
  discussed: (photos) => renderSimilarPhotos(photos, compareComments),
};

const renderSortedPhotos = (photos) => {
  const activeFilter = filterBlock.querySelector('.img-filters__button--active');
  const filterType = activeFilter ? activeFilter.id.replace('filter-', '') : 'default';
  const filterFunction = filterFunctions[filterType];
  if (filterFunction) {
    filterFunction(photos);
  }
};

const setFilterClick = (debounce) => {
  form.addEventListener('click', (evt) => {
    filterBlock.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    debounce();
  });
};

export { renderSimilarPhotos, setFilterClick, renderSortedPhotos };
