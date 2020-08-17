"use strict";

import {Card} from '../components/card.js';
import {Section} from '../components/section.js';
import {PopupWithImage} from '../components/popupWithImage.js';
import {FormValidator} from '../components/formValidator.js';
import {UserInfo} from '../components/userInfo.js';
import {initialCards} from '../utils/initial-cards.js';
import {validationConfig} from '../utils/config.js';
import {popupEditProfile, popupEditOpen, popupEditClose, popupEditSubmit, profileEditForm, nameInput, jobInput, nameOutput, jobOutput, popupAddCard, cardAddOpen, cardAddClose, cardAddSubmit, cardAddForm, cardTitleInput, cardImageInput, cardsListSection, popupImageSection} from '../utils/constants.js';
import { PopupWithForm } from '../components/popupWithForm.js';

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      title: item.title,
      url: item.url,
      cardSelector: '.element-template',
      click: () => handleCardClick(item.title, item.url)
    });
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
    },
  },
cardsListSection);
cardsList.renderItems();

const popupWithImageClass = new PopupWithImage(popupImageSection);

function handleCardClick(title, url) {
  popupWithImageClass.open(title, url);
}

const editProfileFormClass = new PopupWithForm({
  popupSelector: popupEditProfile,
  submit: () => editProfileFormSubmitHandler(nameInput, jobInput)
});

const addCardFormClass = new PopupWithForm({
  popupSelector: popupAddCard,
  submit: () => addCardFormSubmitHandler(cardTitleInput, cardImageInput)
});

editProfileFormClass.setEventListeners();
addCardFormClass.setEventListeners();
popupWithImageClass.setEventListeners();

const profileFormValidator = new FormValidator(validationConfig, profileEditForm);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationConfig, cardAddForm);
cardFormValidator.enableValidation();

const userInfo = new UserInfo({
  nameInfoSelector: nameOutput,
  jobInfoSelector: jobOutput});

// функция добавления пользовательских фотографий

const addCardFormSubmitHandler = (cardTitle, cardImage) => {
  const card = new Card ({
    title: cardTitle.value,
    url: cardImage.value,
    cardSelector: '.element-template',
    click: () => handleCardClick(cardTitle.value, cardImage.value)
  });
  const cardElement = card.generateCard();
  const cardsListSelector = document.querySelector(cardsListSection);
  cardsListSelector.prepend(cardElement);
}

// функция подстановки введенных значений в профиль пользователя

const editProfileFormSubmitHandler = () => {
  userInfo.setUserInfo(nameInput, jobInput);
}

// ОБРАБОТЧИКИ
// открытие попапа "Редактировать профиль"

popupEditOpen.addEventListener('click', () => {
  editProfileFormClass.open();
  const userData = userInfo.getUserInfo(nameOutput, jobOutput);
  nameInput.value = userData.name;
  jobInput.value = userData.job;
});

cardAddOpen.addEventListener('click', () => {
  addCardFormClass.open();
  cardFormValidator.removeErrors(cardAddForm, validationConfig);
});

//cardAddForm.addEventListener('submit', () => addCardFormSubmitHandler(cardTitleInput, cardImageInput));

/*

popupEditClose.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

popupEditSubmit.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

profileEditForm.addEventListener('submit', (evt) => formEditSubmitHandler(evt, nameInput, jobInput, nameOutput, jobOutput));

  // открытие, submit, закрытие окна добавления карточек

cardAddSubmit.addEventListener('click', () => {
  closePopup(popupAddCard);
});

cardAddOpen.addEventListener('click', () => {
  clearForm(cardAddForm);
  //openPopup(popupAddCard);
  cardFormValidator.removeErrors(cardAddForm, validationConfig);
});

cardAddForm.addEventListener('submit', (evt) => addCardFormSubmitHandler(evt, cardTitleInput, cardImageInput));

cardAddClose.addEventListener('click', () => {
  closePopup(popupAddCard);
});



  // обработчик клика на оверлей

//window.addEventListener('click', closePopupByOverlayClick);*/
