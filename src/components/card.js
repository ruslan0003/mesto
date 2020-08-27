export class Card {
  constructor({ title, url, cardSelector, click, likes, api, id, submitPopup, ownerId, myId }) {
    this._title = title;
    this._url = url;
    this._cardSelector = cardSelector;
    this._handleCardClick = click;
    this._howManyLikes = likes;
    this._api = api;
    this._id = id;
    this._submitPopup = submitPopup;
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
    const deleteButton = this._element.querySelector('.element__delete-button');
    deleteButton.addEventListener('click', () => {
      this._submitPopup.setSubmitAction(() =>
        this._api.deleteCard(this._id)
          .then(res => this._element.remove(), this._submitPopup.close())
          .catch(err => {
          console.log(err);
        })
      );
      this._submitPopup.open();
    });

    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._element.querySelector('.element__photo').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  _handleLikeClick() {
    const likeIcon = this._element.querySelector('.element__like-icon');
    const numberOfLikes = this._element.querySelector('.element__like-number');
    likeIcon.classList.toggle('element__like-icon_active');
    if (!likeIcon.classList.contains('element__like-icon_active')) {
      this._api.dislikeCard(this._id)
        .then((res) => {
          numberOfLikes.textContent = `${res.likes.length}`;
        }).catch((err) => {
          console.log(err);
        });
    }
    else {
      this._api.likeCard(this._id)
        .then((res) => {
          numberOfLikes.textContent = `${res.likes.length}`;
        }).catch((err) => {
          console.log(err);
        });
    }
  }

  isOwner(myUserId) {
    const deleteButton = this._element.querySelector('.element__delete-button');
    if (myUserId !== this._ownerId) {
      deleteButton.remove();
    }
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
