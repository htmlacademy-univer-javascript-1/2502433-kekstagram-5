import { getData } from './api.js';
import { renderPhotos } from './pictures.js';
import './form.js';
import './picture-preview.js';
import { debounce } from './util.js';
import { setFilterClick, renderSortedPhotos } from './sorting.js';

const RERENDER_DELAY = 500;
getData((loadedPictures) => {
  renderPhotos(loadedPictures);
  setFilterClick(debounce(() => renderSortedPhotos(loadedPictures), RERENDER_DELAY));
});

