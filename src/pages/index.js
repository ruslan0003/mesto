"use strict";

import { Card } from '../components/card.js';
import { Section } from '../components/section.js';
import { PopupWithImage } from '../components/popupWithImage.js';
import { FormValidator } from '../components/formValidator.js';
import { UserInfo } from '../components/userInfo.js';
import { validationConfig } from '../utils/config.js';
import { popupEditProfile, popupEditOpen, profileEditForm, nameInput, jobInput, nameOutput, jobOutput, popupAddCard, cardAddOpen, cardAddForm, cardTitleInput, cardImageInput, cardsListSection, popupImageSection, popupPhotoItem, popupPhotoTitle, popupSubmit } from '../utils/constants.js';
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

const popupWithSubmitClass = new PopupWithSubmit(popupSubmit);
popupWithSubmitClass.setEventListeners();

Promise.all([
  userData.getData(),
  cardsApi.getData()
]).then(([userData, initialCards]) => {

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
      submitPopup: popupWithSubmitClass,
     /* cardDelete: function handleDeleteClick() {
        popupWithSubmitClass.setSubmitAction(() => {
          cardsApi.deleteCard(imageId).then(() => {
            popupWithSubmitClass.close();
          });
        });
        console.log('Я - открываюсь!');
        popupWithSubmitClass.open();
      },*/
      ownerId: ownerId,
      myId: myId
    });
  }

  // отображение исходного массива карточек, подгружаемого с сервера

  const cardsList = new Section({
    items: initialCards.reverse(),
    renderer: (item) => {
      const card = createCardInstance(item.name, item.link, item.likes.length, item._id, item.owner._id, userData._id);
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
      card.isOwner(userData._id);
    },
  },
    cardsListSection);
  cardsList.renderItems();

  // функция добавления пользовательских фотографий и их отправка на сервер

  const addCardFormSubmitHandler = (cardTitle, cardImage) => {
    cardsApi.createCard(cardTitle.value, cardImage.value).
      then(data => {
        const card = createCardInstance(data.name, data.link, data.likes.length, data._id, data.owner._id, userData._id);
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement);
        card.isOwner(userData._id);
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
  const popupWithImageClass = new PopupWithImage(popupImageSection, popupPhotoItem, popupPhotoTitle);

  function handleCardClick(title, url) {
    popupWithImageClass.open(title, url);
  }

  const editProfileFormClass = new PopupWithForm({
    popupSelector: popupEditProfile,
    form: profileEditForm,
    submit: () => editProfileFormSubmitHandler(nameInput, jobInput)
  });

  /*function deleteCardSubmitHandler() {
    popupWithSubmitClass.setupAction(() => {
    cardsApi.deleteCard(id);
    })
  }

  function handleDeleteClick() {
    popupWithSubmitClass.open();
  }*/

  editProfileFormClass.setEventListeners();
  popupWithImageClass.setEventListeners();

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
});

