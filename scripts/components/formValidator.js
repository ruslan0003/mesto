import {hideInputError, showInputError} from '../utils/utils.js';

export class FormValidator {
  constructor ({inputSelector, inputErrorClass, errorClass, inactiveButtonClass, submitButtonSelector}, form) {
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

// приватный метод проверки валидности формы

  _isFormValid (form, input) {
    if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, this._inputErrorClass, this._errorClass);
    }
    else {
    hideInputError(form, input, this._inputErrorClass, this._errorClass);
    }
  }

  // изменение состояния кнопки сабмита

  _toggleButtonState (allInputList, button, inactiveButtonClass) {
    if (this._hasInvalidInput (allInputList)) {
      button.classList.add(inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(inactiveButtonClass);
      button.disabled = false;
    }
  }

  removeErrors (form) {
    //создаем массив инпутов внутри формы
    const allInputList = Array.from(form.querySelectorAll(this._inputSelector));
    //делаем обход массива инпутов и у каждого убираем класс с ошибкой
    allInputList.forEach((inputElement) => {
        hideInputError (form, inputElement, this._inputErrorClass, this._errorClass);
    });
    const button = form.querySelector(this._submitButtonSelector);
    this._toggleButtonState(allInputList, button, this._inactiveButtonClass);
  }

  _setEventListeners(form, inputSelector, submitButtonSelector) {
    const allInputList = Array.from(form.querySelectorAll(inputSelector));
    // находим кнопку submit в форме "Добавить фото" и вызываем функцию изменения состояния кнопки для её отключения при первоначальном открытии формы
    const buttonAddForm = document.querySelector('.popup-add__submit-button');
    this._toggleButtonState (allInputList, buttonAddForm);
    // обходим коллекцию инпутов и каждому навешиваем обработчик события input
    allInputList.forEach((input) => {
    input.addEventListener('input', () => {
      //при вводе любого символа вызываем функцию isFormValid, передаём ей форму и поле ввода как аргументы
      this._isFormValid(form, input);
      //находим кнопку submit для всех форм, вызываем функцию изменения состояния при невалидном инпуте и передаём массив инпутов и кнопку как аргументы
      const button = form.querySelector(submitButtonSelector);
      this._toggleButtonState (allInputList, button, this._inactiveButtonClass);
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
