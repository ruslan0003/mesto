import {Popup} from './popup.js';

export class PopupWithForm extends Popup {
  constructor({popupSelector, submit}) {
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
    this._popupSelector.querySelector('.form__submit').addEventListener('click', () => {
      this._handleSubmitButton();
    });

    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();

      // добавим вызов функции _handleFormSubmit
      // передадим ей объект — результат работы _getInputValues
      this._handleSubmitButton(this._getInputValues());

      this._popupSelector.reset();
    });
  }
}
