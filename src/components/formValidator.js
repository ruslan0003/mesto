export class FormValidator {
  constructor({ inputSelector, inputErrorClass, errorClass, inactiveButtonClass, submitButtonSelector }, form) {
    this._form = form;
    this._inputSelector = inputSelector;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._inactiveButtonClass = inactiveButtonClass;
    this._submitButtonSelector = submitButtonSelector;
  }

  // приватный метод проверки полей формы на валидность - возвращает true, если хотя бы одно поле невалидно

  _hasInvalidInput(allInputList) {
    return allInputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _showInputError(form, input, errorMessage, inputErrorClass, errorClass) {
    const formErrorMessage = form.querySelector(`#${input.id}-error`);
    input.classList.add(inputErrorClass);
    formErrorMessage.classList.add(errorClass);
    formErrorMessage.textContent = errorMessage;
  }

  // функция отмены стилизации поля с ошибкой в формах

  _hideInputError(form, input, inputErrorClass, errorClass) {
    const formErrorMessage = form.querySelector(`#${input.id}-error`);
    input.classList.remove(inputErrorClass);
    formErrorMessage.classList.remove(errorClass);
    formErrorMessage.textContent = '';
  }

  // приватный метод проверки валидности формы

  _isFormValid(form, input) {
    if (!input.validity.valid) {
      this._showInputError(form, input, input.validationMessage, this._inputErrorClass, this._errorClass);
    }
    else {
      this._hideInputError(form, input, this._inputErrorClass, this._errorClass);
    }
  }

  // изменение состояния кнопки сабмита

  _toggleButtonState(allInputList, button, inactiveButtonClass) {
    if (this._hasInvalidInput(allInputList)) {
      button.classList.add(inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(inactiveButtonClass);
      button.disabled = false;
    }
  }

  removeErrors(form) {
    // создаем массив инпутов внутри формы
    const allInputList = Array.from(form.querySelectorAll(this._inputSelector));
    // делаем обход массива инпутов и у каждого убираем класс с ошибкой
    allInputList.forEach((inputElement) => {
      this._hideInputError(form, inputElement, this._inputErrorClass, this._errorClass);
    });
    const button = form.querySelector(this._submitButtonSelector);
    this._toggleButtonState(allInputList, button, this._inactiveButtonClass);
  }

  // функция стилизации поля с ошибкой в формах

  _setEventListeners(form, inputSelector, submitButtonSelector) {
    const allInputList = Array.from(form.querySelectorAll(inputSelector));
    // находим кнопку submit в форме "Добавить фото" и вызываем функцию изменения состояния кнопки для её отключения при первоначальном открытии формы
    const buttonAddForm = document.querySelector('.popup-add__submit-button');
    this._toggleButtonState(allInputList, buttonAddForm);
    // обходим коллекцию инпутов и каждому навешиваем обработчик события input
    allInputList.forEach((input) => {
      input.addEventListener('input', () => {
        // при вводе любого символа вызываем функцию isFormValid, передаём ей форму и поле ввода как аргументы
        this._isFormValid(form, input);
        // находим кнопку submit для всех форм, вызываем функцию изменения состояния при невалидном инпуте и передаём массив инпутов и кнопку как аргументы
        const button = form.querySelector(submitButtonSelector);
        this._toggleButtonState(allInputList, button, this._inactiveButtonClass);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._form, this._inputSelector, this._submitButtonSelector);
  }
}
