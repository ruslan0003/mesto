"use strict";

import {Card} from '../components/card.js';
import {Section} from '../components/section.js';
import {FormValidator} from '../components/formValidator.js';
import {openPopup, closePopup, closePopupByOverlayClick, formEditSubmitHandler, insertPopupEditFormText, clearForm} from '../utils/utils.js';
import {initialCards} from '../utils/initial-cards.js';
import {validationConfig} from '../utils/config.js';
import {popupEdit, popupEditOpen, popupEditClose, popupEditSubmit, profileEditForm, nameInput, jobInput, nameOutput, jobOutput, cardAdd, cardAddOpen, cardAddClose, cardAddSubmit, cardAddForm, cardTitleInput, cardImageInput, cardsListSection} from '../utils/constants.js';

const cardsList = new Section ({
  items: initialCards,
  renderer: (item) => {
    const card = new Card (item.title, item.url, '.element-template');
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
    },
  },
cardsListSection);

cardsList.renderItems();

const profileFormValidator = new FormValidator(validationConfig, profileEditForm);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationConfig, cardAddForm);
cardFormValidator.enableValidation();

//функция добавления пользовательских фотографий

const addCardFormSubmitHandler = (evt, cardTitle, cardImage) => {
  evt.preventDefault();
  const card = new Card (cardTitle.value, cardImage.value, '.element-template');
  const cardElement = card.generateCard();
  const cardsListSelector = document.querySelector(cardsListSection);
  cardsListSelector.prepend(cardElement);
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

  // открытие, submit, закрытие окна добавления карточек

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
