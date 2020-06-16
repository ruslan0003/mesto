const popup = document.querySelector('.pop-up');
const popupOpen = document.querySelector('.profile__edit-button');
const popupClose = popup.querySelector('.pop-up__close-button');

const popupToggle = function () {
  popup.classList.toggle('pop-up_opened');
}

popupOpen.addEventListener('click', popupToggle);
popupClose.addEventListener('click', popupToggle);

  // Находим форму в DOM
let formElement = document.querySelector('.pop-up__form')// Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = formElement.querySelector('.pop-up__form-field_input_name');// Воспользуйтесь инструментом .querySelector()
    let jobInput = formElement.querySelector('.pop-up__form-field_input_job');// Воспользуйтесь инструментом .querySelector()

    // Получите значение полей из свойства value

    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей

    let nameInputField = document.querySelector('.profile__name');
    let jobInputField = document.querySelector('.profile__position');

    // Вставьте новые значения с помощью textContent

    if (nameInputValue == "") {
      nameInputField.textContent = "Жак-Ив Кусто";
      jobInputField.textContent = "Исследователь океана";
    }

    else {
      nameInputField.textContent = nameInputValue;
      jobInputField.textContent = jobInputValue;
    }

  }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

const popupSubmitClose = popup.querySelector('.pop-up__submit-button');
popupSubmitClose.addEventListener('click', popupToggle);

