// функция стилизации поля с ошибкой в формах

function showInputError(form, input, errorMessage, inputErrorClass, errorClass) {
  const formErrorMessage = form.querySelector(`#${input.id}-error`);
  input.classList.add(inputErrorClass);
  formErrorMessage.classList.add(errorClass);
  formErrorMessage.textContent = errorMessage;
}

// функция отмены стилизации поля с ошибкой в формах

function hideInputError(form, input, inputErrorClass, errorClass) {
  const formErrorMessage = form.querySelector(`#${input.id}-error`);
  input.classList.remove(inputErrorClass);
  formErrorMessage.classList.remove(errorClass);
  formErrorMessage.textContent = '';
}

export {showInputError, hideInputError}
