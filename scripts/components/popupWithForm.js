import {Popup} from './popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._handleSubmitButton = submit;
  }

  _getInputValues() {
  // достаём все элементы полей
  this._inputList = this._element.querySelectorAll('.form__input');

  // создаём пустой объект
  this._formValues = {};

  // добавляем в этот объект значения всех полей
  this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
  });

  // возвращаем объект значений
  return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.querySelector('.form__submit').addEventListener('click', () => {
      this._handleSubmitButton();
    });
  }

  close() {
    super.close();
  }

}
