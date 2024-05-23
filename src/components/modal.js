// Функция закрытия модального окна через Escape
function handleEscClose(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}
// Функция закрытия модального окна через клик по оверлею
function onModalOverlayClick(event) {
  if (event.target.classList.contains("popup_is-opened")) {
    closeModal(event.target);
  }
}
// Функция открытия модального окна
function openModal(modalElement) {
  if (modalElement != null) {
    modalElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", handleEscClose);
    modalElement.addEventListener("mousedown", onModalOverlayClick);
  }
}
// Функция закрытия модального окна
function closeModal(modalElement) {
  if (modalElement != null) {
    modalElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscClose);
    modalElement.removeEventListener("mousedown", onModalOverlayClick);
  }
}

export { openModal, closeModal };
