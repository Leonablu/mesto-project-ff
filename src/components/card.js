//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
//Функция создания карточки
function createCard(cardItem, deleteCallback, likeCallback, imageClickCallback) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);

  const imageCard = cardElement.querySelector(".card__image");
  const titleCard = cardElement.querySelector(".card__title");
  const deleteButtonCard = cardElement.querySelector(".card__delete-button");
  const likeButtonCard = cardElement.querySelector(".card__like-button");
  
  

  imageCard.src = cardItem.link;
  imageCard.alt = cardItem.name;
  titleCard.textContent = cardItem.name;

  deleteButtonCard.addEventListener("click", function () {
    deleteCallback(cardElement);
  });

  likeButtonCard.addEventListener("click", function () {
    likeCallback(likeButtonCard);
  });

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
