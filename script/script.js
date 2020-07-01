const popup = document.querySelector('.pop-up');
const popupOpen = document.querySelector('.profile__edit-button');
const popupClose = popup.querySelector('.pop-up__close-button');
const popupSubmitClose = popup.querySelector('.pop-up__submit-button');

let formElement = document.querySelector('.pop-up__form');
let nameInput = formElement.querySelector('.pop-up__form-field_input_name');
let jobInput = formElement.querySelector('.pop-up__form-field_input_job');
let nameOutput = document.querySelector('.profile__name');
let jobOutput = document.querySelector('.profile__position');


const popupToggle = function () {
  popup.classList.toggle('pop-up_opened');

  if (popup.classList.contains('pop-up_opened')) {
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

const elAdd = document.querySelector('.element-add');
const elAddOpen = document.querySelector('.profile__add-button');
const elAddClose = elAdd.querySelector('.element-add__close-button');
const elAddSubmit = elAdd.querySelector('.element-add__submit-button');

const elAddToggle = function() {
  elAdd.classList.toggle('element-add_opened');
}

elAddOpen.addEventListener('click', elAddToggle);
elAddClose.addEventListener('click', elAddToggle);

//исходный массив элементов с фотографиями

const initialElements = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//отображение исходного массива фотографий на странице


