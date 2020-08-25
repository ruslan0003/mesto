export class Card {
  constructor ({title, url, cardSelector, click, likes, api, id}) {
    this._title = title;
    this._url = url;
    this._cardSelector = cardSelector;
    this._handleCardClick = click;
    this._howManyLikes = likes;
    this._api = api;
    this._id = id;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDeleteClick();
    });

    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._element.querySelector('.element__photo').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleLikeClick() {
    this._element.querySelector('.element__like-icon').classList.toggle('element__like-icon_active');
    this._api.likeCard(this._id);
    console.log(this._id);
  }

  generateCard() {
    this._element = this._getTemplate();
    const photoElement = this._element.querySelector('.element__title');
    const photoTitle = this._element.querySelector('.element__photo');
    const numberOfLikes = this._element.querySelector('.element__like-number');
    photoElement.textContent = this._title;
    photoTitle.src = this._url;
    photoTitle.alt = this._title;
    numberOfLikes.textContent = this._howManyLikes;
    this._setEventListeners();
    return this._element;
  }
}
