//функции открытия и закрытия попапов

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
}

//функция возврата открытого в данный момент модального окна

function getOpenedPopup() {
  return document.querySelector('.popup_opened');
}

//функция закрытия любого попапа нажатием Esc

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(getOpenedPopup());
  }
  else return;
}

//функция закрытия модальных окон кликом на оверлей

function closePopupByOverlayClick(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(getOpenedPopup());
  }
}

//функция стилизации поля с ошибкой в формах

function showInputError(form, input, errorMessage, inputErrorClass, errorClass) {
  const formErrorMessage = form.querySelector(`#${input.id}-error`);
  input.classList.add(inputErrorClass);
  formErrorMessage.classList.add(errorClass);
  formErrorMessage.textContent = errorMessage;
}

//функция отмены стилизации поля с ошибкой в формах

function hideInputError(form, input, inputErrorClass, errorClass) {
  const formErrorMessage = form.querySelector(`#${input.id}-error`);
  input.classList.remove(inputErrorClass);
  formErrorMessage.classList.remove(errorClass);
  formErrorMessage.textContent = '';
}

//функция исходного автозаполнения полей в окне "Редактировать профиль" при его открытии

function insertPopupEditFormText(nameInput, jobInput, nameOutput, jobOutput) {
  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;
}

//функция вставки введенных пользователем значений в окне "Редактировать профиль"

const formEditSubmitHandler = (evt, nameInput, jobInput, nameOutput, jobOutput) => {
  evt.preventDefault();
  nameOutput.textContent = nameInput.value;
  jobOutput.textContent = jobInput.value;
}

//функция очистки полей формы

function clearForm(form) {
  form.reset();
}

export {closePopup, openPopup, closePopupByOverlayClick, getOpenedPopup, showInputError, hideInputError, formEditSubmitHandler, insertPopupEditFormText, clearForm}
