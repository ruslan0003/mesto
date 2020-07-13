//функция стилизации поля с ошибкой в формах

const showInputError = (form, input, errorMessage) => {
  const formErrorMessage = form.querySelector(`#${input.id}-error`);
  input.classList.add('form__input_type_error');
  formErrorMessage.classList.add('form__input-error_active');
  formErrorMessage.textContent = errorMessage;
}

//функция отмены стилизации поля с ошибкой в формах

const hideInputError = (form, input) => {
  const formErrorMessage = form.querySelector(`#${input.id}-error`);
  input.classList.remove('form__input_type_error');
  formErrorMessage.classList.remove('form__input-error_active');
  formErrorMessage.textContent = '';
}

//функция проверки полей формы на валидность - возвращает true, если хотя бы одно поле невалидно

const hasInvalidInput = (allInputList) => {
  return allInputList.some((input) => {
    return !input.validity.valid;
  });
}

//функция изменения состояния у кнопки submit - активное/неактивное

const toggleButtonState = (allInputList, button) => {
  if (hasInvalidInput(allInputList)) {
    button.classList.add('form__submit_inactive');
    button.disabled = true;
  } else {
    button.classList.remove('form__submit_inactive');
    button.disabled = false;
  }
}

//функция проверки валидности полей в формах

function isFormValid (form, input) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  }
  else {
    hideInputError(form, input);
  }
}

//функция добавления слушателей событий всем полям ввода

const setEventListeners = (form) => {
  //cоздаем массив всех инпутов внутри формы
  const allInputList = Array.from(form.querySelectorAll('.form__input'));
  //находим кнопку submit в форме и вызываем функцию изменения состояния кнопки для её отключения при первоначальном открытии формы
  const button = form.querySelector('.form__submit');
  toggleButtonState (allInputList, button);
  //обходим коллекцию инпутов и каждому навешиваем обработчик события input
  allInputList.forEach((input) => {
    input.addEventListener('input', () => {
      //при вводе любого символа вызываем функцию isFormValid, передаём ей форму и поле ввода как аргументы
      isFormValid(form, input);
      //вызываем функцию изменения состояния кнопки повторно, передаём массив инпутов и кнопку как аргументы
      toggleButtonState (allInputList, button);
    });
  });
}

//функция добавления setEventListeners всем формам через служебный класс form

function enableValidation() {
  //создаем массив всех форм
  const allFormList = Array.from(document.querySelectorAll('.form'));
  //обходим коллекцию форм, для каждой отменяем стандартное поведение submit, затем вызываем setEventListener с формой как аргументом
  allFormList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form);
  });
}

enableValidation();
