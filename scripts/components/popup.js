export class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => _handleEscClose(evt));
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => _handleEscClose(evt));
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this._popupSelector.close();
    }
    else return;
  }

  _closePopupByOverlayClick(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this._popupSelector.close();
    }
  }

  setEventListeners() {
    this._popupSelector.querySelector('.close-icon').addEventListener('click', () => {
      this._popupSelector.close();
    });
  }
}

/*Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
Принимает в конструктор единственный параметр — селектор попапа.
Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. */
