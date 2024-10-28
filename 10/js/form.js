import { isEscapeKey, successMessage, showAlert } from './util.js';
import { sendData } from './api.js';
import { validateHashtags, validateComments } from './data-validation.js';

const form = document.querySelector('.img-upload__form');
const uploadFile = form.querySelector('#upload-file');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const uploadCloseButton = form.querySelector('#upload-cancel');
const body = document.querySelector('body');
const hashtags = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const isTextFieldFocused = () =>
  document.activeElement === hashtags ||
  document.activeElement === comment;

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

function closeUploadOverlay () {
  form.reset();
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
}

const openUploadOverlay = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
};

uploadFile.addEventListener('change', openUploadOverlay);
uploadCloseButton.addEventListener('click', closeUploadOverlay);

validateHashtags();
validateComments();

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onSendDataSuccess = () => {
  closeUploadOverlay();
  successMessage();
};

const onSendDataError = () => {
  showAlert('Не удалось загрузить фотографию');
};

const onFormSubmit = () => {
  blockSubmitButton();
  sendData(onSendDataSuccess, onSendDataError, new FormData(form));
  unblockSubmitButton();
};

form.addEventListener('submit', onFormSubmit);