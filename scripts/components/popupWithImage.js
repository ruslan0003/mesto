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
    document.addEventListener('keydown', (evt) => _handleEscClose(evt));
  }

  close() {
    super.close();
  }

}


//в качестве handleCardClick, который должен оказаться в конструкторе Card, передаём метод open класса PopupWithImage.


