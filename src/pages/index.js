"use strict";

import { Api } from '../components/api.js';
import { Card } from '../components/card.js';
import { FormValidator } from '../components/formValidator.js';
import { PopupWithForm } from '../components/popupWithForm.js';
import { PopupWithImage } from '../components/popupWithImage.js';
import { PopupWithSubmit } from '../components/popupWithSubmit.js';
import { Section } from '../components/section.js';
import { UserInfo } from '../components/userInfo.js';
import { validationConfig } from '../utils/config.js';
import { avatarLinkInput, cardAddForm, cardAddOpen, cardImageInput, cardsListSection, cardTitleInput, changeAvatarForm, jobInput, jobOutput, nameInput, nameOutput, popupAddCard, popupAvatar, popupEditOpen, popupEditProfile, popupImageSection, popupPhotoItem, popupPhotoTitle, popupSubmit, profileEditForm, changeAvatarOpen, avatarImage } from '../utils/constants.js';
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

const userDataApi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/users/me',
  headers: {
    'authorization': '82766c49-7200-46d6-b92c-89ba083f974b',
    'Content-Type': 'application/json'
  }
})

// отображение данных о пользователе, подгружаемых с сервера

userDataApi.getData().then(res => {
  nameOutput.textContent = res.name;
  jobOutput.textContent = res.about;
  avatarImage.src = res.avatar;
}).catch((err) => {
  console.log(err);
});

const userInfo = new UserInfo({
  nameInfoSelector: nameOutput,
  jobInfoSelector: jobOutput,
  userAvatarSelector: avatarImage
});

const popupWithSubmitClass = new PopupWithSubmit(popupSubmit);
popupWithSubmitClass.setEventListeners();

Promise.all([
  userDataApi.getData(),
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
        addCardFormClass.close();
      }).catch((err) => {
        console.log(err);
      });
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

  // экземпляр класса PopupWithForm для попапа со сменой аватара

  const changeAvatarPopupClass = new PopupWithForm({
    popupSelector: popupAvatar,
    form: changeAvatarForm,
    submit: () => changeAvatarSubmitHandler(avatarLinkInput)
  })

  const changeAvatarSubmitHandler = () => {
    userDataApi.changeAvatar(avatarLinkInput.value)
    .then((res) => {
      avatarImage.src = res.avatar;
      changeAvatarPopupClass.close();
    }).catch((err) => {
      console.log(err);
    });
  }

  editProfileFormClass.setEventListeners();
  popupWithImageClass.setEventListeners();
  changeAvatarPopupClass.setEventListeners();

  const profileFormValidator = new FormValidator(validationConfig, profileEditForm);
  profileFormValidator.enableValidation();

  const cardFormValidator = new FormValidator(validationConfig, cardAddForm);
  cardFormValidator.enableValidation();

  const avatarFormValidator = new FormValidator(validationConfig, changeAvatarForm);
  avatarFormValidator.enableValidation();

  // подстановка введенных значений в профиль пользователя и их отправка на сервер

  const editProfileFormSubmitHandler = () => {
    userInfo.setUserInfo(nameInput, jobInput);
    userDataApi.editProfile(nameInput.value, jobInput.value);
    editProfileFormClass.close();
  }

   // ОБРАБОТЧИКИ

   popupEditOpen.addEventListener('click', () => {
    editProfileFormClass.open();
    const userData = userInfo.getUserInfo(nameOutput, jobOutput);
    nameInput.value = userData.name;
    jobInput.value = userData.job;
    profileFormValidator.removeErrors(profileEditForm);
  });

  changeAvatarOpen.addEventListener('click', () => {
    changeAvatarPopupClass.open();
    avatarFormValidator.removeErrors(changeAvatarForm);
  })
}).catch((err) => {
  console.log(err);
});



