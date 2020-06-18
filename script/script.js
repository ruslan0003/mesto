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

    if (nameInputValue == "", jobInputValue == "") {
      nameInput.value = nameOutput.textContent;
      jobInput.value = jobOutput.textContent;
    }

    else {
      nameOutput.textContent = nameInputValue;
      jobOutput.textContent = jobInputValue;
    }

  }

formElement.addEventListener('submit', formSubmitHandler);
popupSubmitClose.addEventListener('click', popupToggle);
