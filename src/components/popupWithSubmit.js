import { Popup } from './popup.js';

export class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setSubmitAction(submitAction) {
    this._submitAction = submitAction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitAction();
    })
  }
}


