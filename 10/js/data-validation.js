import { isElementRepeat } from './util.js';

const hashtags = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');
const outlineDefaultStyle = hashtags.style.outline;

const MAX_HASHTAG_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_LENGTH_COMMENT = 140;

const validateHashtags = () => {
  hashtags.addEventListener('input', () => {
    hashtags.style.outline = outlineDefaultStyle;
    hashtags.style.border = 'none';
    if (hashtags.value) {
      let hashtagsArray = hashtags.value.split(' ').filter((hashtag) => hashtag);
      hashtagsArray = hashtagsArray.map((hashtag) => hashtag.toLowerCase());
      hashtagsArray.forEach((element) => {
        element = element.toLowerCase();
        if (hashtagsArray.length > MAX_HASHTAG_COUNT) {
          hashtags.setCustomValidity(`Максимальное количество хэштегов - ${MAX_HASHTAG_COUNT}`);
        } else if (!(element[0] === '#')) {
          hashtags.setCustomValidity(`Хэштег "${element}" должен начинаться с #`);
        } else if (element.length < MIN_HASHTAG_LENGTH) {
          hashtags.setCustomValidity('Хештег не может состоять только из одной решётки');
        } else if (!(/^\w+$/.test(element.slice(1))) || (element.includes('_')) || (element.indexOf('#') > 1)) {
          hashtags.setCustomValidity(`Хэштег "${element}" должен содержать только числа и буквы`);
        } else if (element.length > MAX_HASHTAG_LENGTH) {
          hashtags.setCustomValidity(`Максимальная длина хэштега ${MAX_HASHTAG_LENGTH} символов`);
        } else if (isElementRepeat(element, hashtagsArray)) {
          hashtags.setCustomValidity('Хэштеги не должны повторяться');
        } else {
          hashtags.setCustomValidity('');
        }
      });
    } else {
      hashtags.setCustomValidity('');
    }
    hashtags.reportValidity();
  });
};

const validateComments = () => {
  comment.addEventListener('input', () => {
    comment.style.outline = outlineDefaultStyle;
    comment.style.border = 'none';
    if (comment.value.length > MAX_LENGTH_COMMENT) {
      comment.setCustomValidity(`Длина комментария не должна превышать ${MAX_LENGTH_COMMENT} символов`);
    } else {
      comment.setCustomValidity('');
    }
    comment.reportValidity();
  });
};

export { validateHashtags, validateComments };
