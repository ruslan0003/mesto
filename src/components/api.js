export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getData() {
    return fetch(this._baseUrl, { headers: this._headers })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  createCard(cardTitle, cardUrl) {
    return fetch(this._baseUrl,
      {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify({
          name: cardTitle,
          link: cardUrl
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/likes/${cardId}`,
      {
        headers: this._headers,
        method: 'PUT',
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/likes/${cardId}`,
      {
        headers: this._headers,
        method: 'DELETE',
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  editProfile(userName, userJob) {
    return fetch(this._baseUrl,
      {
        headers: this._headers,
        method: 'PATCH',
        body: JSON.stringify({
          name: userName,
          about: userJob
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/${cardId}`,
      {
        headers: this._headers,
        method: 'DELETE',
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  changeAvatar(link) {
    return fetch(`${this._baseUrl}/avatar`,
      {
        headers: this._headers,
        method: 'PATCH',
        body: JSON.stringify({
          avatar: link,
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

}
