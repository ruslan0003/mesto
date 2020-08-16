export class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
    else return;
  }

  _closePopupByOverlayClick(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  setEventListeners() {
    const closeIcon = this._popupSelector.querySelector('.close-icon');
    closeIcon.addEventListener('click', () => {
      this.close();
    });
    window.addEventListener('click', (evt) => {
      this._closePopupByOverlayClick(evt);
    });
  }

}
