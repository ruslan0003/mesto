"use strict";

//ПЕРЕМЕННЫЕ - находим в DOM необходимые элементы

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

//функция добавления пользовательских фотографий

function cardAddFormSubmitHandler (evt) {
    evt.preventDefault();

    const cardTitleInputValue = cardTitleInput.value;
    const cardImageInputValue = cardImageInput.value;

    renderCard(cardTitleInputValue, cardImageInputValue);
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
  removeErrors(profileEditForm, validationConfig);
});

popupEditClose.addEventListener('click', () => {
  popupClose(popupEdit);
});

popupEditSubmit.addEventListener('click', () => {
  popupClose(popupEdit);
});

profileEditForm.addEventListener('submit', formEditSubmitHandler);

//открытие, submit, закрытие окна добавления карточек

cardAddSubmit.addEventListener('click', () => {
  popupClose(cardAdd);
});

cardAddOpen.addEventListener('click', () => {
  clearForm(cardAddForm);
  popupOpen(cardAdd);
  removeErrors(cardAddForm, validationConfig);
});

cardAddForm.addEventListener('submit', cardAddFormSubmitHandler);

cardAddClose.addEventListener('click', () => {
  popupClose(cardAdd);
});


