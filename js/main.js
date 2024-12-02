import { loadData } from './api.js';
import './form.js';
import { debounce } from './util.js';
import { renderSimilarPhotos, setFilterClick, renderSortedPhotos } from './sorting.js';

const RERENDER_DELAY = 500;
loadData((loadedPictures) => {
  renderSimilarPhotos(loadedPictures);
  setFilterClick(debounce(() => renderSortedPhotos(loadedPictures), RERENDER_DELAY));
});

