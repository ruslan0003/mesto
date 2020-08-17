export class UserInfo {
  constructor ({nameInfoSelector, jobInfoSelector}) {
    this._nameInfoSelector = nameInfoSelector;
    this._jobInfoSelector = jobInfoSelector;
  }

  getUserInfo(nameText, jobText) {
    this._values = {
      name: nameText.textContent,
      job: jobText.textContent
    };
    return this._values;
  }

  setUserInfo(name, job) {
    this._nameInfoSelector.textContent = name.value;
    this._jobInfoSelector.textContent = job.value;
  }
}
