export class UserInfo {
  constructor ({nameInfoSelector, jobInfoSelector}) {
    this._nameInfoSelector = nameInfoSelector;
    this._jobInfoSelector = jobInfoSelector;
  }

  getUserInfo() {
    const userData = {name: this._nameInfo, job: this._jobInfo};
  }

  setUserInfo() {

  }
}


/*
function insertPopupEditFormText(nameInput, jobInput, nameOutput, jobOutput) {
      nameInput.value = nameOutput.textContent;
      jobInput.value = jobOutput.textContent;
    }*/
