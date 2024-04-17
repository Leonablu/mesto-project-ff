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
const formElement = document.querySelector(".popup__form");
const addForm = document.querySelector(".popup__form[name='new-place']");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");
const nameCardInput = document.querySelector(".popup__input_type_card-name");
const urlCardInput = document.querySelector(".popup__input_type_url");
const imgPopup = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
// Открытие модального окна по клику на кнопку
function toggleModal(button, popup) {
  button.addEventListener('click', function() {
    openModal(popup);
  });
}

toggleModal(editButton, editPopup);
toggleModal(addButton, addPopup);
// Закрытие модального окна по клику на крестик
closeButtons.forEach(function (closeButton) {
  closeButton.addEventListener('click', function () {
      const popup = closeButton.closest('.popup');
      closeModal(popup);
  });
});
// Модальное окно с редактирование информации о пользователе
function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const description = descriptionInput.value;
  const nameElement = document.querySelector(".profile__title");
  const descriptionElement = document.querySelector(".profile__description");
  nameElement.textContent = name;
  descriptionElement.textContent = description;
  closeModal(editPopup);
}

formElement.addEventListener('submit', handleFormSubmit);
// Модальное окно с добавление карточки
function handleAddFormSubmit(evt) {
  evt.preventDefault(); 
  const cardName = nameCardInput.value;
  const cardUrl = urlCardInput.value;
  placesList.prepend(createCard({ name: cardName, link: cardUrl }, deleteCard, handleLike, openImageModal));
  closeModal(addPopup);
  addForm.reset(); 
}

addForm.addEventListener('submit', handleAddFormSubmit);
// Модальное окно при клике на картинку
function openImageModal(imageSrc, imageAlt) {
  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;
  openModal(imgPopup);
}
// Вывести карточки на страницу
initialCards.forEach(function (cardItem) {
  placesList.append(createCard(cardItem, deleteCard, handleLike, openImageModal));
});

