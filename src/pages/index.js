"use strict";

import { Card } from '../components/card.js';
import { Section } from '../components/section.js';
import { PopupWithImage } from '../components/popupWithImage.js';
import { FormValidator } from '../components/formValidator.js';
import { UserInfo } from '../components/userInfo.js';
import { validationConfig } from '../utils/config.js';
import { popupEditProfile, popupEditOpen, profileEditForm, nameInput, jobInput, nameOutput, jobOutput, popupAddCard, cardAddOpen, cardAddForm, cardTitleInput, cardImageInput, cardsListSection, popupImageSection, popupPhotoItem, popupPhotoTitle, popupSubmitForm, popupSubmitOpen, popupSubmitSubmit, popupSubmit } from '../utils/constants.js';
import { PopupWithForm } from '../components/popupWithForm.js';
import { Api } from '../components/api.js';
import { PopupWithSubmit } from '../components/popupWithSubmit.js';
import './index.css';

// подключение API для карточек

const cardsApi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/cards',
  headers: {
    'authorization': '82766c49-7200-46d6-b92c-89ba083f974b',
    'Content-Type': 'application/json'
  }
})

// подключение API для информации о пользователе

const userData = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/users/me',
  headers: {
    'authorization': '82766c49-7200-46d6-b92c-89ba083f974b',
    'Content-Type': 'application/json'
  }
})

// отображение данных о пользователе, подгружаемых с сервера

userData.getData().then(res => {
  nameOutput.textContent = res.name;
  jobOutput.textContent = res.about;
})

const userInfo = new UserInfo({
  nameInfoSelector: nameOutput,
  jobInfoSelector: jobOutput
});

// функция создания нового экземпляра карточки

function createCardInstance(imageTitle, imageUrl, likesNumber, imageId, ownerId, myId) {
  return new Card({
    title: imageTitle,
    url: imageUrl,
    cardSelector: '.element-template',
    click: () => handleCardClick(imageTitle, imageUrl),
    likes: likesNumber,
    api: cardsApi,
    id: imageId,
    submitPopup: popupSubmit,
    cardDelete: () => handleDeleteClick(),
    ownerId: ownerId,
    myId: myId
  });
}

// отображение исходного массива карточек, подгружаемого с сервера

cardsApi.getData()
.then(cards => {
  const cardsList = new Section({
    items: cards.reverse(),
    renderer: (item) => {
      const card = createCardInstance(item.name, item.link, item.likes.length, item._id, item.owner._id);
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    },
  },
    cardsListSection);
  cardsList.renderItems();

  // функция добавления пользовательских фотографий и их отправка на сервер

  const addCardFormSubmitHandler = (cardTitle, cardImage) => {
    cardsApi.createCard(cardTitle.value, cardImage.value).
    then(data => {
      const card = createCardInstance(data.name, data.link, data.likes.length, data._id, data.owner._id);
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    })
  }

  const addCardFormClass = new PopupWithForm({
    popupSelector: popupAddCard,
    form: cardAddForm,
    submit: () => addCardFormSubmitHandler(cardTitleInput, cardImageInput)
  });

  addCardFormClass.setEventListeners();

  cardAddOpen.addEventListener('click', () => {
    addCardFormClass.open();
    cardFormValidator.removeErrors(cardAddForm);
  });
});

const popupWithImageClass = new PopupWithImage(popupImageSection, popupPhotoItem, popupPhotoTitle);

function handleCardClick(title, url) {
  popupWithImageClass.open(title, url);
}

const editProfileFormClass = new PopupWithForm({
  popupSelector: popupEditProfile,
  form: profileEditForm,
  submit: () => editProfileFormSubmitHandler(nameInput, jobInput)
});

const submitFormClass = new PopupWithSubmit({
  popupSelector: popupSubmit,
  form: popupSubmitForm,
  submit: () => deleteCardFormSubmitHandler()
});

editProfileFormClass.setEventListeners();
popupWithImageClass.setEventListeners();
submitFormClass.setEventListeners();

function handleDeleteClick() {
  submitFormClass.open();
}

const deleteCardFormSubmitHandler = (evt) => {
  deleteSubmit(evt);
}

const profileFormValidator = new FormValidator(validationConfig, profileEditForm);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationConfig, cardAddForm);
cardFormValidator.enableValidation();

// подстановка введенных значений в профиль пользователя и их отправка на сервер

const editProfileFormSubmitHandler = () => {
  userInfo.setUserInfo(nameInput, jobInput);
  userData.editProfile(nameInput.value, jobInput.value);
}

// ОБРАБОТЧИКИ

popupEditOpen.addEventListener('click', () => {
  editProfileFormClass.open();
  const userData = userInfo.getUserInfo(nameOutput, jobOutput);
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  profileFormValidator.removeErrors(profileEditForm);
});

