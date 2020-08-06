import {popupOpen, popupClose} from './utils.js';

export class Card {
  constructor (title, url, cardSelector) {
    this._title = title;
    this._url = url;
    this._cardSelector = cardSelector;
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
      this._handleImageClick(this._title, this._url);
    });

    document.querySelector('.popup-image__close-icon').addEventListener('click', () => {
      this._handleCloseClick();
    });
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleLikeClick() {
    this._element.querySelector('.element__like-icon').classList.toggle('element__like-icon_active');
  }

  _handleImageClick(title, url) {
    document.querySelector('.popup-image__photo').src = url;
    document.querySelector('.popup-image__photo').alt = title;
    document.querySelector('.popup-image__title').textContent = title;
    popupOpen(document.querySelector('.popup-image'));
  }

  _handleCloseClick() {
    popupClose(document.querySelector('.popup-image'));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__title').textContent = this._title;
    this._element.querySelector('.element__photo').src = this._url;
    this._setEventListeners();
    return this._element;
  }

}
