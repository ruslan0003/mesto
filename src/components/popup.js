export class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closePopupByOverlayClick = this._closePopupByOverlayClick.bind(this);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    window.addEventListener('click', this._closePopupByOverlayClick);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    window.removeEventListener('click', this._closePopupByOverlayClick);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
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
  }
}
