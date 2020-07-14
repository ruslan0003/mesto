//функция стилизации поля с ошибкой в формах

const showInputError = (form, input, errorMessage, {inputErrorClass, errorClass, ...rest}) => {
  const formErrorMessage = form.querySelector(`#${input.id}-error`);
  input.classList.add(inputErrorClass);
  formErrorMessage.classList.add(errorClass);
  formErrorMessage.textContent = errorMessage;
}

//функция отмены стилизации поля с ошибкой в формах

const hideInputError = (form, input, {inputErrorClass, errorClass, ...rest}) => {
  const formErrorMessage = form.querySelector(`#${input.id}-error`);
  input.classList.remove(inputErrorClass);
  formErrorMessage.classList.remove(errorClass);
  formErrorMessage.textContent = '';
}

//функция очистки сообщений об ошибке при открытии формы

function removeErrors (form, {inputSelector, inputErrorClass, errorClass}){
  //создаем массив инпутов внутри формы
  const allInputList = Array.from(form.querySelectorAll(inputSelector));
  //делаем обход массива инпутов и у каждого убираем класс с ошибкой
  allInputList.forEach((inputSelector) => {
      inputSelector.classList.remove(inputErrorClass);
  });
  //создаем массив спанов с ошибками внутри формы
  const allErrorSpanList = form.querySelectorAll('.form__input-error');
  //обходим массив с ошибками и убираем класс, отвечающий за их показ
  allErrorSpanList.forEach((errorText) => {
    errorText.textContent = '';
    errorText.classList.remove(errorClass);
});
}

//функция проверки полей формы на валидность - возвращает true, если хотя бы одно поле невалидно

const hasInvalidInput = (allInputList) => {
  return allInputList.some((input) => {
    return !input.validity.valid;
  });
}

//функция изменения состояния у кнопки submit - активное/неактивное

const toggleButtonState = (allInputList, button, {inactiveButtonClass}) => {
  if (hasInvalidInput(allInputList)) {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  }
}

//функция проверки валидности полей в формах

function isFormValid (form, input, {...rest}) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, {...rest});
  }
  else {
    hideInputError(form, input, {...rest});
  }
}

//функция добавления слушателей событий всем полям ввода

function setEventListeners (form, {inputSelector, submitButtonSelector, ...rest}) {
  //cоздаем массив всех инпутов внутри формы
  const allInputList = Array.from(form.querySelectorAll(inputSelector));
  //находим кнопку submit в форме и вызываем функцию изменения состояния кнопки для её отключения при первоначальном открытии формы
  const button = form.querySelector(submitButtonSelector);
  toggleButtonState (allInputList, button, {...rest});
  //обходим коллекцию инпутов и каждому навешиваем обработчик события input
  allInputList.forEach((input) => {
    input.addEventListener('input', () => {
      //при вводе любого символа вызываем функцию isFormValid, передаём ей форму и поле ввода как аргументы
      isFormValid(form, input, {...rest});
      //вызываем функцию изменения состояния кнопки повторно, передаём массив инпутов и кнопку как аргументы
      toggleButtonState (allInputList, button, {...rest});
    });
  });
}

//функция добавления setEventListeners всем формам через класс form

function enableValidation({formSelector, ...rest}) {
  //создаем массив всех форм
  const allFormList = Array.from(document.querySelectorAll(formSelector));
  //обходим коллекцию форм, для каждой отменяем стандартное поведение submit, затем вызываем setEventListener с формой как аргументом
  allFormList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, {...rest});
  });
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});
