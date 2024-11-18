import { showAlert } from './util.js';

const getData = (onSuccess) => {
  fetch('https://29.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .then((posts) => {
      if (!posts) {
        throw new Error();
      }
      onSuccess(posts);
    })
    .catch(() => {
      showAlert('Не удалось загрузить данные с сервера');
    });
};

const sendData = (onSuccess, body) => {
  fetch('https://29.javascript.htmlacademy.pro/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if(!response.ok) {
        throw new Error();
      }
      onSuccess();
    })
    .catch(() => {
      showAlert('Не удалось отправить фото');
    });
};

export { getData, sendData };
