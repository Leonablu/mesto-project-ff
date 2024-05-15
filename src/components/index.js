import "../pages/index.css";
import { createCard, deleteCard, handleLike } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getInitialCards,
  getUserInfo,
  updateUserInfo,
  addNewCard,
  addNewAvatar,
} from "./api.js";
// DOM узлы
const placesList = document.querySelector(".places__list");
const editPopup = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");
const addPopup = document.querySelector(".popup_type_new-card");
const addButton = document.querySelector(".profile__add-button");
const updatePopup = document.querySelector(".popup_type_new-avatar");
const updateButton = document.querySelector(".profile__update-button");
const closeButtons = document.querySelectorAll(".popup__close");
const profileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];
const newAvatarForm = document.forms["avatar-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description"
);
const nameElement = document.querySelector(".profile__title");
const descriptionElement = document.querySelector(".profile__description");
const nameCardInput = document.querySelector(".popup__input_type_card-name");
const urlCardInput = document.querySelector(".popup__input_type_url");
const avatarUrlInput = document.querySelector(".popup__input_type_avatar-url");
const imgPopup = document.querySelector(".popup_type_image");
const profileImage = document.querySelector(".profile__image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
let currentUserId;
// UX для кнопки сохранить
function renderLoading(isLoading, form, buttonText = "Сохранить") {
  const button = form.querySelector(validationConfig.submitButtonSelector);
  button.textContent = isLoading ? "Сохранение..." : buttonText;
}
// Открытие модального окна по клику на кнопку
function setupModalOpen(button, popup, form, callback) {
  button.addEventListener("click", function () { 
      clearValidation(form, validationConfig); 
      callback();
      openModal(popup); 
    }); 
  }

setupModalOpen(editButton, editPopup, profileForm,  fillProfileForm);
setupModalOpen(updateButton, updatePopup, newAvatarForm, function() {
  newAvatarForm.reset();
});
setupModalOpen(addButton, addPopup, newPlaceForm, function(){
  newPlaceForm.reset();
})
// Модальное окно при клике на картинку
function openImageModal(imageSrc, imageAlt) {
  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;
  openModal(imgPopup);
}
// Функция заполнение инпутов значениями из элементов профиля
function fillProfileForm() {
  nameInput.value = nameElement.textContent;
  descriptionInput.value = descriptionElement.textContent;
}
// Функция обновления профиля
function updateUserProfile(userInfo) {
  nameElement.textContent = userInfo.name;
  descriptionElement.textContent = userInfo.about;
  if (userInfo.avatar && profileImage) {
    profileImage.style.backgroundImage = `url("${userInfo.avatar}")`;
  }
}
// Закрытие модального окна по клику на крестик
closeButtons.forEach(function (closeButton) {
  closeButton.addEventListener("click", function () {
    const popup = closeButton.closest(".popup");
    closeModal(popup);
  });
});
// Функция добавления аватара
function handleUpdateFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, newAvatarForm);
  const avatarData = avatarUrlInput.value;

  addNewAvatar(avatarData)
    .then((updatedUserInfo) => {
      profileImage.style.backgroundImage = `url("${updatedUserInfo.avatar}")`;
      closeModal(updatePopup);
      newAvatarForm.reset();
      clearValidation(newAvatarForm, validationConfig);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading(false, newAvatarForm);
    });
}

newAvatarForm.addEventListener("submit", handleUpdateFormSubmit);
// Модальное окно с редактирование информации о пользователе
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, profileForm);
  const userData = {
    name: nameInput.value,
    about: descriptionInput.value,
  };

  updateUserInfo(userData)
  .then((updatedUserInfo) => {
    updateUserProfile(updatedUserInfo);
    closeModal(editPopup);
  })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading(false, profileForm);
    });
}

profileForm.addEventListener("submit", handleProfileFormSubmit);
// Модальное окно с добавление карточки
function handlenewPlaceFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, newPlaceForm);
  const cardData = {
    name: nameCardInput.value,
    link: urlCardInput.value,
  };

  addNewCard(cardData)
    .then((newCard) => {
      const cardElement = createCard({
        cardItem: newCard,
        deleteCallback: deleteCard,
        likeCallback: handleLike,
        imageClickCallback: openImageModal,
        userId: currentUserId,
        likes: newCard.likes
      });
      placesList.prepend(cardElement);
      closeModal(addPopup);
      newPlaceForm.reset();
      clearValidation(newPlaceForm, validationConfig);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading(false, newPlaceForm);
    });
}

newPlaceForm.addEventListener("submit", handlenewPlaceFormSubmit);

enableValidation(validationConfig);
// Вывести карточки на страницу
document.addEventListener("DOMContentLoaded", () => {
  Promise.all([getInitialCards(), getUserInfo()])
    .then(([cards, userInfo]) => {
      currentUserId = userInfo._id;
      cards.forEach(function (cardItem) {
        const cardOptions = {
          cardItem: cardItem,
          deleteCallback: deleteCard,
          likeCallback: handleLike,
          imageClickCallback: openImageModal,
          userId: userInfo._id,
          likes: cardItem.likes,
        };

        placesList.append(createCard(cardOptions));
      });
      updateUserProfile(userInfo);
    })
    .catch((err) => {
      console.log(err);
    });
});