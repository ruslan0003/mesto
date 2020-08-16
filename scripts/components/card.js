export class Card {
  constructor ({title, url, cardSelector, click}) {
    this._title = title;
    this._url = url;
    this._cardSelector = cardSelector;
    this._handleCardClick = click;
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
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__title').textContent = this._title;
    this._element.querySelector('.element__photo').src = this._url;
    this._element.querySelector('.element__photo').alt = this._title;
    this._setEventListeners();
    return this._element;
  }
}

/*_handleImageClick(title, url) {
  const popupPhotoItem = document.querySelector('.popup-image__photo');
  const popupPhotoTitle = document.querySelector('.popup-image__title');
  const popupPhotoSection = document.querySelector('.popup-image');
  popupPhotoItem.src = url;
  popupPhotoItem.alt = title;
  popupPhotoTitle.textContent = title;
  openPopup(popupPhotoSection);
}*/
