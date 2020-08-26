import {Popup} from './popup.js';

export class PopupWithSubmit extends Popup {
  constructor({ popupSelector, form, submit }) {
    super(popupSelector);
    this._form = form;
    this._handleSubmitButton = submit;
  }

    setSubmitAction(callback) {
      this._onClick = callback;
    }

    setEventListeners() {
      super.setEventListeners();
      //this.setSubmitAction(callback);
    }

}


