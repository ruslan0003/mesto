import {Popup} from './popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector, popupPhotoItem, popupPhotoTitle) {
    super(popupSelector);
    this._popupPhotoItem = popupPhotoItem;
    this._popupPhotoTitle = popupPhotoTitle;
  }

  open(title, url) {
    super.open();
    this._popupPhotoItem.src = url;
    this._popupPhotoTitle.alt = title;
    this._popupPhotoTitle.textContent = title;
  }

}


