import '../pages/index.css'
import { initialCards } from './cards.js'
import { createCard, deleteCard, handleLike } from './card.js';
import { openModal, closeModal } from './modal.js';
// DOM узлы
const placesList = document.querySelector(".places__list");
const editPopup = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");
const addPopup = document.querySelector(".popup_type_new-card");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const form = document.querySelector('.popup__form');
const profileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");
const nameElement = document.querySelector(".profile__title");
const descriptionElement = document.querySelector(".profile__description");
const nameCardInput = document.querySelector(".popup__input_type_card-name");
const urlCardInput = document.querySelector(".popup__input_type_url");
const imgPopup = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupInput = form.querySelector('.popup__input');
const formError = form.querySelector(`.${popupInput.id}-error`);
// Открытие модального окна по клику на кнопку
function toggleModal(button, popup, isEdit = false) {
  button.addEventListener('click', function() {
    if (isEdit) {
      fillProfileForm();
      resetFormErrors(popup);
    }
    openModal(popup);
  });
}

toggleModal(editButton, editPopup, true); 
toggleModal(addButton, addPopup);
// Функция заполнение инпутов значениями из элементов профиля
function fillProfileForm() {
  nameInput.value = nameElement.textContent;
  descriptionInput.value = descriptionElement.textContent;
}
// Функция для сброса ошибок валидации
function resetFormErrors(popup) {
  const errorElements = popup.querySelectorAll('.form__input-error_active');
  const inputElements = popup.querySelectorAll('.popup__input');
  errorElements.forEach((errorElement) => {
      errorElement.classList.remove('form__input-error_active');
      errorElement.textContent = '';
  });
  inputElements.forEach((inputElement) => {
      inputElement.classList.remove('form__input_type_error');
  });
}
// Закрытие модального окна по клику на крестик
closeButtons.forEach(function (closeButton) {
  closeButton.addEventListener('click', function () {
      const popup = closeButton.closest('.popup');
      closeModal(popup);
  });
});
// Модальное окно с редактирование информации о пользователе
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const description = descriptionInput.value;
  nameElement.textContent = name;
  descriptionElement.textContent = description;
  closeModal(editPopup);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);
// Модальное окно при клике на картинку
function openImageModal(imageSrc, imageAlt) {
  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;
  openModal(imgPopup);
}
// Модальное окно с добавление карточки
function handlenewPlaceFormSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    cardItem: {
      name: nameCardInput.value,
      link: urlCardInput.value
    },
    deleteCallback: deleteCard,
    likeCallback: handleLike,
    imageClickCallback: openImageModal
  };
  placesList.prepend(createCard(cardData));
  closeModal(addPopup);
  newPlaceForm.reset();
}

newPlaceForm.addEventListener('submit', handlenewPlaceFormSubmit);
// Работа с формами
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};


const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault()
    });
    setEventListeners(formElement);
  });
};

const hasInvalidInput = (inputList) => {
  
  return inputList.some((inputElement) => {

    return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElement) => {

if  (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
        buttonElement.disabled = true;
    buttonElement.classList.add('button_inactive');
  } else {
        // иначе сделай кнопку активной
        buttonElement.disabled = false;
    buttonElement.classList.remove('button_inactive');
  }
}; 

enableValidation()

// Вывести карточки на страницу
initialCards.forEach(function (cardItem) {
  const cardOptions = {
    cardItem: cardItem,
    deleteCallback: deleteCard,
    likeCallback: handleLike,
    imageClickCallback: openImageModal
  };
  placesList.append(createCard(cardOptions));
});

