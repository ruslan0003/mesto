const popup = document.querySelector('.popup-edit');
const popupOpen = document.querySelector('.profile__edit-button');
const popupClose = popup.querySelector('.popup-edit__close-button');
const popupSubmitClose = popup.querySelector('.popup-edit__submit-button');

let formElement = document.querySelector('.popup-edit__form');
let nameInput = formElement.querySelector('.popup-edit__form-field_input_name');
let jobInput = formElement.querySelector('.popup-edit__form-field_input_job');
let nameOutput = document.querySelector('.profile__name');
let jobOutput = document.querySelector('.profile__position');


const popupToggle = function () {
  popup.classList.toggle('popup-edit_opened');

  if (popup.classList.contains('popup-edit_opened')) {
    nameInput.value = nameOutput.textContent;
    jobInput.value = jobOutput.textContent;
  }
}

popupOpen.addEventListener('click', popupToggle);
popupClose.addEventListener('click', popupToggle);


function formSubmitHandler (evt) {
    evt.preventDefault();

    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;

    nameOutput.textContent = nameInputValue;
    jobOutput.textContent = jobInputValue;

  }

formElement.addEventListener('submit', formSubmitHandler);
popupSubmitClose.addEventListener('click', popupToggle);

//открытие и закрытие попапа "Добавить фото"

const elAdd = document.querySelector('.popup-add');
const elAddOpen = document.querySelector('.profile__add-button');
const elAddClose = elAdd.querySelector('.popup-add__close-button');
const elAddSubmit = elAdd.querySelector('.popup-add__submit-button');

const elAddToggle = function() {
  elAdd.classList.toggle('popup-add_opened');
}

elAddOpen.addEventListener('click', elAddToggle);
elAddClose.addEventListener('click', elAddToggle);

//исходный массив элементов с фотографиями

const initialElements = [
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

//отображение исходного массива фотографий на странице

const elAddForm = document.querySelector('.popup-add__form');
const elAddFormSubmitClose = elAddForm.querySelector('.popup-add__submit-button');
let elTitleInput = elAddForm.querySelector('.popup-add__form-field_input_title');
let elImageInput = elAddForm.querySelector('.popup-add__form-field_input_url');

const elTemplate = document.querySelector('.element-template').content;
const elList = document.querySelector('.elements');

function addElements(title, url) {

// клонируем содержимое тега template
const elItem = elTemplate.cloneNode(true);

// наполняем содержимым
const itemPhoto = elItem.querySelector('.element__photo');

itemPhoto.src = url;

const itemTitle = elItem.querySelector('.element__title');

itemTitle.textContent = title;

// отображаем на странице
elList.prepend(elItem);

//кнопка удаления карточки

const deleteButton = document.querySelector('.element__delete-button');

//функция удаления

function deleteElement (evt) {

  const element = evt.target.closest('.element');

  element.remove();
}

//обработчик кнопки удалить

deleteButton.addEventListener('click', deleteElement);

//кнопка лайк

const likeButton = document.querySelector('.element__like-button');

//функция смены цвета сердечка при лайке карточки

function likeIconColorChange (evt) {

  if (evt.target.src.includes('black')) {
    evt.target.setAttribute('src', '../images/heart-icon.svg');
  }
  else evt.target.setAttribute('src', '../images/heart-icon-black.svg');
}

//обработчик кнопки лайк

likeButton.addEventListener('click', likeIconColorChange);

//открытие фотографии - задаём фото и подпись
const imagePopup = document.querySelector('.popup-image');
let photoImagePopup = document.querySelector('.popup-image__photo');
let titleImagePopup = document.querySelector('.popup-image__title');

//функция попапа с изображением

function openImagePopup() {

photoImagePopup.setAttribute('src', url);
titleImagePopup.textContent = title;

imagePopup.classList.add('popup-image_opened');

}

//обработчик открытия фото

itemPhoto.addEventListener('click', openImagePopup);

//закрытие попапа с фото

function ClosePopupImage() {
    imagePopup.classList.remove('popup-image_opened');
}

const buttonClosePopupImage = document.querySelector('.popup-image__close-icon');
buttonClosePopupImage.addEventListener('click', ClosePopupImage);

}

initialElements.forEach(function(item, index) {
  addElements(initialElements[index].title, initialElements[index].url);
});


//добавление пользовательских фотографий

function elAddFormSubmitHandler (evt) {
    evt.preventDefault();

    let elTitleInputValue = elTitleInput.value;
    let elImageInputValue = elImageInput.value;

    addElements(elTitleInputValue, elImageInputValue);
}

elAddForm.addEventListener('submit', elAddFormSubmitHandler);
elAddFormSubmitClose.addEventListener('click', elAddToggle);
