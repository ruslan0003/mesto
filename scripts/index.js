"use strict";

import {Card} from './card.js';
import {FormValidator} from './formValidator.js';
import {openPopup, closePopup, closePopupByOverlayClick, formEditSubmitHandler, insertPopupEditFormText, clearForm} from './utils.js';
import {initialCards} from './initial-cards.js';
import {validationConfig} from './config.js';

//ПЕРЕМЕННЫЕ - находим в DOM необходимые элементы

const popupEdit = document.querySelector('.popup-edit');
const popupEditOpen = document.querySelector('.profile__edit-button');
const popupEditClose = popupEdit.querySelector('.popup-edit__close-button');
const popupEditSubmit = popupEdit.querySelector('.popup-edit__submit-button');
const profileEditForm = document.querySelector('.popup-edit__form');
const nameInput = profileEditForm.querySelector('.form__input_type_name');
const jobInput = profileEditForm.querySelector('.form__input_type_job');
const nameOutput = document.querySelector('.profile__name');
const jobOutput = document.querySelector('.profile__position');
const cardAdd = document.querySelector('.popup-add');
const cardAddOpen = document.querySelector('.profile__add-button');
const cardAddClose = cardAdd.querySelector('.popup-add__close-button');
const cardAddSubmit = cardAdd.querySelector('.popup-add__submit-button');
const cardAddForm = document.querySelector('.popup-add__form');
const cardTitleInput = cardAddForm.querySelector('.form__input_type_title');
const cardImageInput = cardAddForm.querySelector('.form__input_type_url');
const cardsList = document.querySelector('.elements');

initialCards.forEach((item) => {
  const card = new Card (item.title, item.url, '.element-template');
  const cardElement = card.generateCard();
  cardsList.append(cardElement);
});

const profileFormValidator = new FormValidator(validationConfig, profileEditForm);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationConfig, cardAddForm);
cardFormValidator.enableValidation();

//функция добавления пользовательских фотографий

const addCardFormSubmitHandler = (evt, cardTitle, cardImage) => {
  evt.preventDefault();
  const card = new Card (cardTitle.value, cardImage.value, '.element-template');
  const cardElement = card.generateCard();
  cardsList.prepend(cardElement);
}

// ОБРАБОТЧИКИ
// открытие, submit, закрытие окна редактирования профиля

popupEditOpen.addEventListener('click', () => {
  insertPopupEditFormText(nameInput, jobInput, nameOutput, jobOutput);
  openPopup(popupEdit);
  profileFormValidator.removeErrors(profileEditForm, validationConfig);
});

popupEditClose.addEventListener('click', () => {
  closePopup(popupEdit);
});

popupEditSubmit.addEventListener('click', () => {
  closePopup(popupEdit);
});

profileEditForm.addEventListener('submit', (evt) => formEditSubmitHandler(evt, nameInput, jobInput, nameOutput, jobOutput));

  //открытие, submit, закрытие окна добавления карточек

cardAddSubmit.addEventListener('click', () => {
  closePopup(cardAdd);
});

cardAddOpen.addEventListener('click', () => {
  clearForm(cardAddForm);
  openPopup(cardAdd);
  cardFormValidator.removeErrors(cardAddForm, validationConfig);
});

cardAddForm.addEventListener('submit', (evt) => addCardFormSubmitHandler(evt, cardTitleInput, cardImageInput));

cardAddClose.addEventListener('click', () => {
  closePopup(cardAdd);
});

  // обработчик клика на оверлей

window.addEventListener('click', closePopupByOverlayClick);
