"use strict";

import {Card} from './card.js';
import {FormValidator} from './formvalidator.js'
import {popupOpen, popupClose, closePopupByOverlayClick, formEditSubmitHandler, cardAddFormSubmitHandler, popupInsertFormText, clearForm} from './utils.js';

//ПЕРЕМЕННЫЕ - находим в DOM необходимые элементы

const popupEdit = document.querySelector('.popup-edit');
const popupEditOpen = document.querySelector('.profile__edit-button');
const popupEditClose = popupEdit.querySelector('.popup-edit__close-button');
const popupEditSubmit = popupEdit.querySelector('.popup-edit__submit-button');
const profileEditForm = document.querySelector('.popup-edit__form');
export const nameInput = profileEditForm.querySelector('.form__input_type_name');
export const jobInput = profileEditForm.querySelector('.form__input_type_job');
export const nameOutput = document.querySelector('.profile__name');
export const jobOutput = document.querySelector('.profile__position');
const cardAdd = document.querySelector('.popup-add');
const cardAddOpen = document.querySelector('.profile__add-button');
const cardAddClose = cardAdd.querySelector('.popup-add__close-button');
const cardAddSubmit = cardAdd.querySelector('.popup-add__submit-button');
const cardAddForm = document.querySelector('.popup-add__form');
export const cardTitleInput = cardAddForm.querySelector('.form__input_type_title');
export const cardImageInput = cardAddForm.querySelector('.form__input_type_url');


export const initialCards = [
  {
      title: 'Архыз',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      title: 'Челябинская область',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      title: 'Иваново',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      title: 'Камчатка',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      title: 'Холмогорский район',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      title: 'Байкал',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach((item) => {
  const card = new Card (item.title, item.url, '.element-template');
  const cardElement = card.generateCard();
  document.querySelector('.elements').prepend(cardElement);
});

export const validationConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

const profileForm = new FormValidator(validationConfig, profileEditForm);
profileForm.enableValidation();

const cardForm = new FormValidator(validationConfig, cardAddForm);
cardForm.enableValidation();


// ОБРАБОТЧИКИ
// открытие, submit, закрытие окна редактирования профиля

popupEditOpen.addEventListener('click', () => {
  popupInsertFormText();
  popupOpen(popupEdit);
  const profileForm = new FormValidator(validationConfig, profileEditForm);
  profileForm.removeErrors(profileEditForm, validationConfig);
  });

popupEditClose.addEventListener('click', () => {
  popupClose(popupEdit);
  });

popupEditSubmit.addEventListener('click', () => {
  popupClose(popupEdit);
  });

profileEditForm.addEventListener('submit', formEditSubmitHandler);

  //открытие, submit, закрытие окна добавления карточек

cardAddSubmit.addEventListener('click', () => {
  popupClose(cardAdd);
  });

cardAddOpen.addEventListener('click', () => {
  clearForm(cardAddForm);
  popupOpen(cardAdd);
  const cardForm = new FormValidator(validationConfig, cardAddForm);
  cardForm.removeErrors(cardAddForm, validationConfig);
  });

cardAddForm.addEventListener('submit', cardAddFormSubmitHandler);

cardAddClose.addEventListener('click', () => {
  popupClose(cardAdd);
  });

  // обработчик клика на оверлей

window.addEventListener('click', closePopupByOverlayClick);
