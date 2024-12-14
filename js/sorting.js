import { renderPhotos } from './pictures.js';

const PHOTO_RANDOM_AMOUNT = 10;
const filterBlock = document.querySelector('.img-filters');

const compareComments = (photoA, photoB) => (photoB.comments.length - photoA.comments.length);

const compareRandom = () => Math.random() - 0.5;

const form = filterBlock.querySelector('.img-filters__form');

const filterFunctions = {
  default: renderPhotos,
  random: (photos) => renderPhotos(photos, compareRandom, PHOTO_RANDOM_AMOUNT),
  discussed: (photos) => renderPhotos(photos, compareComments),
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

export { setFilterClick, renderSortedPhotos };
