//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
//Функция создания карточки
function createCard(options) {
  const { cardItem, deleteCallback, likeCallback, imageClickCallback } = options;
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const imageCard = cardElement.querySelector(".card__image");
  const titleCard = cardElement.querySelector(".card__title");
  const deleteButtonCard = cardElement.querySelector(".card__delete-button");
  const likeButtonCard = cardElement.querySelector(".card__like-button");
  imageCard.src = cardItem.link;
  imageCard.alt = cardItem.name;
  titleCard.textContent = cardItem.name;
  //Функция каллбека при удалении
  deleteButtonCard.addEventListener("click", function () {
    deleteCallback(cardElement);
  });
//Функция каллбека при лайке
  likeButtonCard.addEventListener("click", function () {
    likeCallback(likeButtonCard);
  });
//Функция каллбека при клике на изображение
  imageCard.addEventListener("click", function() {
    imageClickCallback(imageCard.src, imageCard.alt);
  });


  return cardElement;
}
//Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}
//Функция лайка карточки
function handleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, handleLike }; 
