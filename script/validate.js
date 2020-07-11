//функция стилизации поля с ошибкой в формах

const showInputError = (form, input, errorMessage) => {
  const formErrorMessage = form.querySelector(`#${input.id}-error`);
  input.classList.add('popup-edit__form-field_type_error');
  formErrorMessage.classList.add('popup-edit__input-error_active');
  formErrorMessage.textContent = errorMessage;
}

//функция отмены стилизации поля с ошибкой в формах

const hideInputError = (form, input) => {
  const formErrorMessage = form.querySelector(`#${input.id}-error`);
  input.classList.remove('popup-edit__form-field_type_error');
  formErrorMessage.classList.remove('popup-edit__input-error_active');
  formErrorMessage.textContent = '';
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

//функция добавления слушателей событий всем полям ввода через служебный класс popup-form__input

const setEventListeners = (form) => {
  //cоздаем массив всех инпутов внутри формы
  const allInputList = Array.from(form.querySelectorAll('.popup-form__input'));
  //обходим коллекцию инпутов и каждому навешиваем обработчик события input
  allInputList.forEach((input) => {
    input.addEventListener('input', () => {
      //при вводе любого символа вызываем функцию isFormValid, передаём ей форму и поле ввода как аргументы
      isFormValid(form, input);
    });
  });
}

//функция добавления setEventListeners всем формам через служебный класс popup-form

function enableValidation() {
  //создаем массив всех форм
  const allFormList = Array.from(document.querySelectorAll('.popup-form'));
  //обходим коллекцию форм, для каждой отменяем стандартное поведение submit, затем вызываем setEventListener с формой как аргументом
  allFormList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form);
  });
}

enableValidation();


//функция проверки полей формы на валидность - возвращает true, если хотя бы одно поле невалидно

//функция изменения класса у кнопки submit - активное/неактивное состояние
