"use strict";

import {Card} from '../components/card.js';
import {Section} from '../components/section.js';
import {PopupWithImage} from '../components/popupWithImage.js';
import {FormValidator} from '../components/formValidator.js';
import {UserInfo} from '../components/userInfo.js';
import {initialCards} from '../utils/initial-cards.js';
import {validationConfig} from '../utils/config.js';
import {popupEditProfile, popupEditOpen, profileEditForm, nameInput, jobInput, nameOutput, jobOutput, popupAddCard, cardAddOpen, cardAddForm, cardTitleInput, cardImageInput, cardsListSection, popupImageSection, popupPhotoItem, popupPhotoTitle} from '../utils/constants.js';
import {PopupWithForm} from '../components/popupWithForm.js';
import './index.css';

// функция создания нового экземпляра карточки

function createCardInstance(imageTitle, imageUrl) {
  return new Card({
    title: imageTitle,
    url: imageUrl,
    cardSelector: '.element-template',
    click: () => handleCardClick(imageTitle, imageUrl)
  });
 }

const cardsList = new Section({
  items: initialCards.reverse(),
  renderer: (item) => {
    const card = createCardInstance(item.title, item.url);
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
    },
  },
cardsListSection);
cardsList.renderItems();

const popupWithImageClass = new PopupWithImage(popupImageSection, popupPhotoItem, popupPhotoTitle);

function handleCardClick(title, url) {
  popupWithImageClass.open(title, url);
}

const editProfileFormClass = new PopupWithForm({
  popupSelector: popupEditProfile,
  form: profileEditForm,
  submit: () => editProfileFormSubmitHandler(nameInput, jobInput)
});

const addCardFormClass = new PopupWithForm({
  popupSelector: popupAddCard,
  form: cardAddForm,
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
  const card = createCardInstance(cardTitle.value, cardImage.value);
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
}

// функция подстановки введенных значений в профиль пользователя

const editProfileFormSubmitHandler = () => {
  userInfo.setUserInfo(nameInput, jobInput);
}

// ОБРАБОТЧИКИ

popupEditOpen.addEventListener('click', () => {
  editProfileFormClass.open();
  const userData = userInfo.getUserInfo(nameOutput, jobOutput);
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  profileFormValidator.removeErrors(profileEditForm);
});

cardAddOpen.addEventListener('click', () => {
  addCardFormClass.open();
  cardFormValidator.removeErrors(cardAddForm);
});
