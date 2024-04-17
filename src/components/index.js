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
// Открытие модального окна по клику на кнопку
function toggleModal(button, popup, isEdit = false) {
  button.addEventListener('click', function() {
    if (isEdit) {
      fillProfileForm();
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

