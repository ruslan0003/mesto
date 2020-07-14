//ПЕРЕМЕННЫЕ - находим в DOM необходимые элементы
const popupGlobal = document.querySelector('.popup');

//модальное окно "Редактировать профиль"
const popupEdit = document.querySelector('.popup-edit');
const popupEditOpen = document.querySelector('.profile__edit-button');
const popupEditClose = popupEdit.querySelector('.popup-edit__close-button');
const popupEditSubmit = popupEdit.querySelector('.popup-edit__submit-button');
const profileEditForm = document.querySelector('.popup-edit__form');
const nameInput = profileEditForm.querySelector('.form__input_type_name');
const jobInput = profileEditForm.querySelector('.form__input_type_job');
const nameOutput = document.querySelector('.profile__name');
const jobOutput = document.querySelector('.profile__position');

//модальное окно "Добавить фото"
const cardAdd = document.querySelector('.popup-add');
const cardAddOpen = document.querySelector('.profile__add-button');
const cardAddClose = cardAdd.querySelector('.popup-add__close-button');
const cardAddSubmit = cardAdd.querySelector('.popup-add__submit-button');
const cardAddForm = document.querySelector('.popup-add__form');

//отображение исходного массива карточек на странице
const cardTitleInput = cardAddForm.querySelector('.form__input_type_title');
const cardImageInput = cardAddForm.querySelector('.form__input_type_url');
const cardTemplate = document.querySelector('.element-template').content;
const cardsList = document.querySelector('.elements');

//модальное окно с открытием фотографии - задаём фото и подпись
const imagePopup = document.querySelector('.popup-image');

//ФУНКЦИИ
//функции открытия и закрытия любого из попапов

function popupOpen(popupType) {
  popupType.classList.add('popup_opened');
}

function popupClose(popupType) {
    popupType.classList.remove('popup_opened');
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

//исходный массив карточек с фотографиями

const initialCards = [
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

//функция удаления карточек

function deleteElement (evt) {

  const element = evt.target.closest('.element');

  element.remove();
}

//функция смены цвета сердечка при лайке карточки

function likeIconColorChange (evt) {

  cardLikeIcon = evt.target;

  cardLikeIcon.classList.toggle('element__like-icon_active');
}

//функция открытия попапа с изображением

function openImagePopup(title, url) {

  const photoImagePopup = document.querySelector('.popup-image__photo');
  const titleImagePopup = document.querySelector('.popup-image__title');

  photoImagePopup.src = url;
  titleImagePopup.textContent = title;
  photoImagePopup.alt = title;

  popupOpen(imagePopup);

}

//функция сборки карточек
function addCard(title, url) {

  //клонируем содержимое тега template
  const cardItem = cardTemplate.cloneNode(true);

  //локальные переменные
  const itemTitle = cardItem.querySelector('.element__title');
  const itemPhoto = cardItem.querySelector('.element__photo');

  //наполняем динамическим содержимым
  itemPhoto.src = url;
  itemTitle.textContent = title;
  itemPhoto.alt = title;

  //обработчик кнопки удалить
  const cardDeleteButton = cardItem.querySelector('.element__delete-button');
  cardDeleteButton.addEventListener('click', deleteElement);

  //обработчик кнопки лайк
  const cardLikeButton = cardItem.querySelector('.element__like-button');
  cardLikeButton.addEventListener('click', likeIconColorChange);

  //обработчик открытия фото
  itemPhoto.addEventListener('click', () => { openImagePopup(title, url) });

  //обработчик кнопки закрытия фото
  const buttonClosePopupImage = document.querySelector('.popup-image__close-icon');
  buttonClosePopupImage.addEventListener('click', () => {
  popupClose(imagePopup);
});

//возврат собранной карточки
return cardItem;
}

//функция рендеринга карточки на странице
function renderCard(title, url) {
  const cardRendered = addCard(title, url);
  cardsList.prepend(cardRendered);
}

initialCards.forEach((card) => {
  renderCard(card.title, card.url);
});

//функция добавления пользовательских фотографий

function cardAddFormSubmitHandler (evt) {
    evt.preventDefault();

    const cardTitleInputValue = cardTitleInput.value;
    const cardImageInputValue = cardImageInput.value;

    renderCard(cardTitleInputValue, cardImageInputValue);
}

//функция возврата открытого в данный момент модального окна

function isOpenedNow () {
  return document.querySelector('.popup_opened');
}

//функция закрытия любого попапа нажатием Esc

function closePopupByEsc (evt) {
  const popupOpened = isOpenedNow();
  if (evt.key === 'Escape') {
    popupClose (popupOpened);
  }
}

//функция закрытия модальных окон кликом на оверлей

function closePopupByOverlayClick (evt) {
  const popupOpened = isOpenedNow();
  if (evt.target == popupOpened) {
    popupClose (popupOpened);
  }
}

//функция навешивания/снятия обработчика нажатия Esc

function escEventListenerToggle () {
  if (isOpenedNow()) {
    document.addEventListener('keydown', closePopupByEsc);
  }
  else {
    document.removeEventListener('keydown', closePopupByEsc);
  }
}

//функция очистки полей формы

function clearForm (form) {
  form.reset();
}

//ОБРАБОТЧИКИ
//открытие, submit, закрытие окна редактирования профиля

popupEditOpen.addEventListener('click', () => {
  popupInsertFormText();
  popupOpen(popupEdit);
  removeErrors(profileEditForm, {inputSelector: '.form__input', inputErrorClass: 'form__input_type_error', errorClass: 'form__input-error_active'});
});

popupEditClose.addEventListener('click', () => {
  popupClose(popupEdit);
  clearForm(profileEditForm);
});

popupEditSubmit.addEventListener('click', () => {
  popupClose(popupEdit);
  clearForm(profileEditForm);
});

profileEditForm.addEventListener('submit', formEditSubmitHandler);

//открытие, submit, закрытие окна добавления карточек

cardAddSubmit.addEventListener('click', () => {
  popupClose(cardAdd);
});

cardAddOpen.addEventListener('click', () => {
  clearForm(cardAddForm);
  popupOpen(cardAdd);
  removeErrors(cardAddForm, {inputSelector: '.form__input', inputErrorClass: 'form__input_type_error', errorClass: 'form__input-error_active'});
  //заблокируем активацию кнопки submit после добавления пользовательской карточки
  cardAddSubmit.disabled = true;
  cardAddSubmit.classList.add('form__submit_inactive');
});

cardAddForm.addEventListener('submit', cardAddFormSubmitHandler);

cardAddClose.addEventListener('click', () => {
  popupClose(cardAdd);
});

//обработчик нажатия кнопки Esc

document.addEventListener('keydown', escEventListenerToggle);

//обработчик клика на оверлей

window.addEventListener('click', closePopupByOverlayClick);
