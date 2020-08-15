class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => _handleEscClose(evt));
  }

  close() {
    this.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => _handleEscClose(evt));
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      close(_getOpenedPopup());
    }
    else return;
  }

  _getOpenedPopup() {
    return document.querySelector('.popup_opened');
  }

  setEventListeners() {
    this.querySelector('.close-icon').addEventListener('click', () => {
      this.close();
    });
  }
}
