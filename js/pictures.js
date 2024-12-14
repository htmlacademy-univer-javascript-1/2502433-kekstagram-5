import {openBigPicture} from './big-picture.js';

const containerPhotoMiniature = document.querySelector('.pictures');
const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const filterBlock = document.querySelector('.img-filters');

const renderPhotos = (similarPhotos, compareFunction, photosAmount) => {
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

export { renderPhotos };
