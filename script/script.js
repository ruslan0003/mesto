//ПЕРЕМЕННЫЕ - находим в DOM необходимые элементы
const popupGlobal = document.querySelector('.popup');

//модальное окно "Редактировать профиль"
const popupEdit = document.querySelector('.popup-edit');
const popupEditOpen = document.querySelector('.profile__edit-button');
const popupEditClose = popupEdit.querySelector('.popup-edit__close-button');
const popupEditSubmit = popupEdit.querySelector('.popup-edit__submit-button');
const formElement = document.querySelector('.popup-edit__form');
const nameInput = formElement.querySelector('.popup-edit__form-field_input_name');
const jobInput = formElement.querySelector('.popup-edit__form-field_input_job');
const nameOutput = document.querySelector('.profile__name');
const jobOutput = document.querySelector('.profile__position');

//модальное окно "Добавить фото"
const cardAdd = document.querySelector('.popup-add');
const cardAddOpen = document.querySelector('.profile__add-button');
const cardAddClose = cardAdd.querySelector('.popup-add__close-button');
const cardAddSubmit = cardAdd.querySelector('.popup-add__submit-button');

//отображение исходного массива карточек на странице
const cardAddForm = document.querySelector('.popup-add__form');
const cardTitleInput = cardAddForm.querySelector('.popup-add__form-field_input_title');
const cardImageInput = cardAddForm.querySelector('.popup-add__form-field_input_url');
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

//отображаем исходный массив карточек
/*initialCards.forEach(function(item, index) {
  renderCard(initialCards[index].title, initialCards[index].url);
});*/

initialCards.forEach((card) => {
  renderCard(card.title, card.url);
});

//добавление пользовательских фотографий

function cardAddFormSubmitHandler (evt) {
    evt.preventDefault();

    const cardTitleInputValue = cardTitleInput.value;
    const cardImageInputValue = cardImageInput.value;

    renderCard(cardTitleInputValue, cardImageInputValue);
}

//ОБРАБОТЧИКИ
//открытие, submit, закрытие окна редактирования профиля

popupEditOpen.addEventListener('click', () => {
  popupInsertFormText();
  popupOpen(popupEdit);
});

popupEditClose.addEventListener('click', () => {
  popupClose(popupEdit);
});

popupEditSubmit.addEventListener('click', () => {
  popupClose(popupEdit);
});

formElement.addEventListener('submit', formEditSubmitHandler);

//открытие, submit, закрытие окна добавления карточек

cardAddSubmit.addEventListener('click', () => {
  popupClose(cardAdd);
  });

cardAddOpen.addEventListener('click', () => {
  popupOpen(cardAdd);
});

cardAddForm.addEventListener('submit', cardAddFormSubmitHandler);

cardAddClose.addEventListener('click', () => {
  popupClose(cardAdd);
});
