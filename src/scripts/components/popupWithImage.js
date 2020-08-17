import {Popup} from './popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(title, url) {
    const popupPhotoItem = document.querySelector('.popup-image__photo');
    const popupPhotoTitle = document.querySelector('.popup-image__title');
    popupPhotoItem.src = url;
    popupPhotoTitle.alt = title;
    popupPhotoTitle.textContent = title;
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

}


