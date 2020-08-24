export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getData() {
    return fetch(this._baseUrl, { headers: this._headers })
      .then((res) => {
        return res.json();
      }
      )
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
      .then((res) => {
        return res.json();
    });
  }

  deleteCard() {

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
