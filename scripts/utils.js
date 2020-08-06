import {nameInput, jobInput, nameOutput, jobOutput, cardImageInput, cardTitleInput} from './index.js';
import {Card} from './card.js';

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

//функция стилизации поля с ошибкой в формах

const showInputError = (form, input, errorMessage, {inputErrorClass, errorClass}) => {
  const formErrorMessage = form.querySelector(`#${input.id}-error`);
  input.classList.add(inputErrorClass);
  formErrorMessage.classList.add(errorClass);
  formErrorMessage.textContent = errorMessage;
}

//функция отмены стилизации поля с ошибкой в формах

const hideInputError = (form, input, {inputErrorClass, errorClass}) => {
  const formErrorMessage = form.querySelector(`#${input.id}-error`);
  input.classList.remove(inputErrorClass);
  formErrorMessage.classList.remove(errorClass);
  formErrorMessage.textContent = '';
}

//функция исходного автозаполнения полей в окне "Редактировать профиль" при его открытии

function popupInsertFormText() {
  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;
}

//функция вставки введенных пользователем значений в окне "Редактировать профиль"

function formEditSubmitHandler (evt) {
  evt.preventDefault();

  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  nameOutput.textContent = nameInputValue;
  jobOutput.textContent = jobInputValue;

}

//функция добавления пользовательских фотографий

function cardAddFormSubmitHandler (evt) {
  evt.preventDefault();

    const card = new Card (cardTitleInput.value, cardImageInput.value, '.element-template');
    const cardElement = card.generateCard();
    document.querySelector('.elements').prepend(cardElement);

}

//функция очистки полей формы

function clearForm (form) {
form.reset();
}

export {popupClose, popupOpen, closePopupByOverlayClick, getOpenedPopup, showInputError, hideInputError, formEditSubmitHandler, popupInsertFormText, clearForm, cardAddFormSubmitHandler}
