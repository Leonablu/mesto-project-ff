import { likeCard, dislikeCard } from "./api.js";
import { openConfirmPopup } from "./index.js";
//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
//Функция создания карточки
function createCard(options) {
  const {
    cardItem,
    deleteCallback,
    likeCallback,
    imageClickCallback,
    userId,
    likes,
  } = options;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const imageCard = cardElement.querySelector(".card__image");
  const titleCard = cardElement.querySelector(".card__title");
  const deleteButtonCard = cardElement.querySelector(".card__delete-button");
  const likeButtonCard = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-count");

  cardElement.setAttribute("data-card-id", cardItem._id);
  imageCard.src = cardItem.link;
  imageCard.alt = cardItem.name;
  titleCard.textContent = cardItem.name;

  const isLikedByUser = likes.some((like) => like._id === userId);
  likeButtonCard.classList.toggle("card__like-button_is-active", isLikedByUser);
  likeCounter.textContent = likes.length;
  //Функция каллбека при удалении карточки
  if (cardItem.owner._id !== userId) {
    deleteButtonCard.style.display = "none";
  } else {
    deleteButtonCard.addEventListener("click", function () {
      deleteCallback(cardItem._id, cardElement);
    });
  }
  //Функция каллбека при лайке
  likeButtonCard.addEventListener("click", function () {
    likeCallback(cardItem._id, userId);
  });
  //Функция каллбека при клике на изображение
  imageCard.addEventListener("click", function () {
    imageClickCallback(imageCard.src, imageCard.alt);
  });

  return cardElement;
}
// Функция установки обработчиков для карточки
function setupCardEvents(cardId, cardElement) {
  openConfirmPopup(cardElement, cardId);
}

// Функция обработки лайка карточки
function handleLike(cardId, userId) {
  const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
  const likeButton = cardElement.querySelector(".card__like-button");
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const action = isLiked ? dislikeCard : likeCard;

  action(cardId)
    .then(({ likes }) => updateLikeState(likeButton, likes, userId))
    .catch(console.error);
}
// Функция для обновления состояния лайка и счетчика лайков
function updateLikeState(likeButton, likes, userId) {
  const userHasLiked = likes.some((like) => like._id === userId);
  likeButton.classList.toggle("card__like-button_is-active", userHasLiked);
  const likeCounter = likeButton.nextElementSibling;
  likeCounter.textContent = likes.length;
}

export { createCard, setupCardEvents, handleLike };
