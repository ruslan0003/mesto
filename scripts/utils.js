//функции открытия и закрытия попапов

function popupOpen(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function popupClose(popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
}

//функция возврата открытого в данный момент модального окна

function getOpenedPopup () {
  return document.querySelector('.popup_opened');
}

//функция закрытия любого попапа нажатием Esc

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    popupClose (getOpenedPopup());
  }
  else return;
}

//функция закрытия модальных окон кликом на оверлей

function closePopupByOverlayClick (evt) {
  if (evt.target.classList.contains('popup_opened')) {
    popupClose (getOpenedPopup());
  }
}

export {popupClose, popupOpen, closePopupByOverlayClick, getOpenedPopup}
