import { showAlert } from './util.js';

const Urls = {
  GET: 'https://29.javascript.htmlacademy.pro/kekstagram/data',
  POST: 'https://29.javascript.htmlacademy.pro/kekstagram',
};

const sendRequest = (onSuccess, method, body, onFail) => {
  fetch(
    Urls[method],
    {
      method: method,
      body: body,
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      if (method === 'GET') {
        showAlert('Не удалось загрузить данные с сервера');
      } else {
        onFail();
      }
    });
};

const loadData = (onSuccess, method = 'GET') => sendRequest(onSuccess, method);
const uploadData = (onSuccess, method, body, onFail) => sendRequest(onSuccess, method, body, onFail);

export {loadData, uploadData};
