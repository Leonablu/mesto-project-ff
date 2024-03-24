// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
// @todo: Функция создания карточки
function addCard(cardItem, deleteCallback) {
  const cardElement = cardTemplate
    .querySelector(".places__item").cloneNode(true);

  const imageCard = cardElement.querySelector(".card__image");
  const titleCard = cardElement.querySelector(".card__title");
  const deleteButtonCard = cardElement.querySelector(".card__delete-button");
  const likeButtonCard = cardElement.querySelector(".card__like-button");

  imageCard.src = cardItem.link;
  imageCard.alt = cardItem.name;
  titleCard.textContent = cardItem.name;
  // @todo: Функция удаления карточки
  deleteButtonCard.addEventListener('click', function () {
    deleteCallback(cardElement)
  }); 

  likeButtonCard.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like-button");
  });

  return cardElement;
}

function handleDelete (cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (cardItem) {
  placesList.append(addCard(cardItem, handleDelete));
});