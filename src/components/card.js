export class Card {
  constructor ({title, url, cardSelector, click, likes, api, id, submitPopup, cardDelete, ownerId, myId}) {
    this._title = title;
    this._url = url;
    this._cardSelector = cardSelector;
    this._handleCardClick = click;
    this._howManyLikes = likes;
    this._api = api;
    this._id = id;
    this._submitPopup = submitPopup;
    this._handleDeleteClick = cardDelete;
    this._ownerId = ownerId;
    this._myId = myId;
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
      this.deleteSubmit();
    });

    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._element.querySelector('.element__photo').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  deleteSubmit() {
      this._api.deleteCard(this._id)
      .then(res => this._element.remove());
  }

  _handleLikeClick() {
    const likeIcon = this._element.querySelector('.element__like-icon');
    const numberOfLikes = this._element.querySelector('.element__like-number');
    likeIcon.classList.toggle('element__like-icon_active');
    if (!likeIcon.classList.contains('element__like-icon_active')) {
      this._api.dislikeCard(this._id)
      .then((res) => {
        numberOfLikes.textContent = `${res.likes.length}`;
      });
    }
    else {
      this._api.likeCard(this._id)
      .then((res) => {
        numberOfLikes.textContent = `${res.likes.length}`;
      });
    }
  }

  /*isOwner() {
    const myId = this._api.getData().then((res) => {
      return res.owner._id;
    })
    .then(res => console.log(res))
  }*/

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
