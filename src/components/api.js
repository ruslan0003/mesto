export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getData() {
    return fetch(this._baseUrl, { headers: this._headers })
      .then((res) => {
        return res.json();
      });
  }

  createCard(cardTitle, cardUrl, cardLikes) {
    return fetch(this._baseUrl,
      {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify({
          name: cardTitle,
          link: cardUrl,
          likes: cardLikes
        })
      })
      .then((res) => {
        return res.json();
    });
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/likes/${cardId}`,
      {
        headers: this._headers,
        method: 'PUT',
      })
      .then((res) => {
        return res.json()
    });
  }

  dislikeCard() {
    return fetch(this._baseUrl,
      {
        headers: this._headers,
        method: 'DELETE',
      })
      .then((res) => {
        return res.json();
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
      .then((res) => {
        return res.json();
    });
  }

}
