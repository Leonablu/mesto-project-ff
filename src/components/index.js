import '../pages/index.css'
import { createCard, deleteCard, handleLike } from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getInitialCards, getUserInfo, updateUserInfo, addNewCard } from './api.js'
// DOM узлы
const placesList = document.querySelector(".places__list");
const editPopup = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");
const addPopup = document.querySelector(".popup_type_new-card");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
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
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
// Открытие модального окна по клику на кнопку
function toggleModal(button, popup, isEdit = false) {
  button.addEventListener('click', function() {
    if (isEdit) {
      fillProfileForm();
      clearValidation(profileForm, validationConfig);
    }
    newPlaceForm.reset()
    clearValidation(newPlaceForm, validationConfig);
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
// Функция обновления профиля
function updateUserProfile(userInfo) {
  nameElement.textContent = userInfo.name;
  descriptionElement.textContent = userInfo.about;
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
  const userData = {
    name: nameInput.value,
    about: descriptionInput.value
  }
  updateUserInfo(userData)
    .then((updatedUserInfo) => {
      nameElement.textContent = updatedUserInfo.name;
      descriptionElement.textContent = updatedUserInfo.about;
      closeModal(editPopup);
    })
    .catch((error) => {
      console.error(error);
    });
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
    name: nameCardInput.value,
    link: urlCardInput.value
  };

  addNewCard(cardData)
    .then((newCard) => {
      const cardElement = createCard({
        cardItem: {
          name: newCard.name,
          link: newCard.link
        },
        deleteCallback: deleteCard,
        likeCallback: handleLike,
        imageClickCallback: openImageModal
      });
      placesList.prepend(cardElement);
      closeModal(addPopup);
      newPlaceForm.reset();
      clearValidation(newPlaceForm, validationConfig);
    })
    .catch((error) => {
      console.error(error);
    });
}

newPlaceForm.addEventListener('submit', handlenewPlaceFormSubmit);

enableValidation(validationConfig);
// Вывести карточки на страницу
document.addEventListener('DOMContentLoaded', () => {
  Promise.all([getInitialCards(), getUserInfo()])
    .then(([cards, userInfo]) => {
      cards.forEach(function (cardItem) {
        const cardOptions = {
          cardItem: cardItem,
          deleteCallback: deleteCard,
          likeCallback: handleLike,
          imageClickCallback: openImageModal,
          userId: userInfo._id 
        };
        placesList.append(createCard(cardOptions));
      });
      updateUserProfile(userInfo);
    })
    .catch((err) => {
      console.log(err);
    });
});

 
