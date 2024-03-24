// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
// @todo: Функция создания карточки
function addCard(cardItem, deleteCallback) {
  const cardElement = cardTemplate
    .querySelector(".places__item").cloneNode(true);

  let imageCard = cardElement.querySelector(".card__image");
  let titleCard = cardElement.querySelector(".card__title");
  const deleteButtonCard = cardElement.querySelector(".card__delete-button");
  const likeButtonCard = cardElement.querySelector(".card__like-button");

  imageCard.src = cardItem.link;
  imageCard.alt = cardItem.name;
  titleCard.textContent = cardItem.name;
  // @todo: Функция удаления карточки
  deleteButtonCard.addEventListener("click", function () {
    if (typeof deleteCallback === "function") {
      deleteCallback(cardElement);
    } else {
      cardElement.remove();
    }
  });

  likeButtonCard.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like-button");
  });

  return cardElement;
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function (cardItem, deleteCallback) {
  placesList.append(addCard(cardItem, deleteCallback));
});