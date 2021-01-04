//* Класс для взаимодействия с сервером
export default class Api {
  constructor(data) {
    this._serverUrl = data.serverUrl;
    this._token = data.token;
  }

  //* Проверка статуса запроса
  _requestResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Что-то пошло не так: Ошибка ${res.status}`);
    }
  }

  //* Запрос данных пользователя
  getUserInfo() {
    return fetch(`${this._serverUrl}users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then((res) => this._requestResult(res))
  }

  //* Запрос изначальных карточек
  getInitialCards() {
    return fetch(`${this._serverUrl}cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then((res) => this._requestResult(res))
  }

  //* Запрос на редактирование данных пользователя
  editProfile(data) {
    return fetch(`${this._serverUrl}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.job
      })
    })
    .then((res) => this._requestResult(res))
  }

  //* Запрос на добавление карточки
  addNewCard(data) {
    return fetch(`${this._serverUrl}cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'applocation/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then((res) => this._requestResult(res))
  }

  //* Запрос на удаление карточки
  deleteCard(data) {
    return fetch(`${this._serverUrl}cards/${data}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then((res) => this._requestResult(res))
  }

  //* Запрос на добавление лайка карточке
  addCardLike(data) {
    return fetch(`${this._serverUrl}cards/likes/${data}`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
    .then((res) => this._requestResult(res))
  }

  //* Запрос на удаление лайка карточки
  deleteCardLike(data) {
    return fetch(`${this._serverUrl}cards/likes/${data}`, {
      method: 'DELETE', 
      header: {
        authorization: this._token
      }
    })
    .then((res) => this._requestResult(res))
  }

  editAvatar(data) {
    return fetch(`${this._serverUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then((res) => this._requestResult(res))
  }
}

