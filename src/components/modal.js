// Функция закрытия модального окна через Escape
function handleEscClose(event) {
  if (event.key === 'Escape') {
      closeModal(this);
  }
}
// Функция закрытия модального окна через клик по оверлею
function onModalOverlayClick(event) {
  if (event.target === this) {
    closeModal(this);
  }
}  
// Функция открытия модального окна 
function openModal(modalElement) {
  if (modalElement != null) {
    modalElement.classList.add('popup_open');
    const boundEscClose = handleEscClose.bind(modalElement);
    modalElement.boundEscClose = boundEscClose;
    document.addEventListener('keydown', boundEscClose);
    const boundOverlayClick = onModalOverlayClick.bind(modalElement);
    modalElement.addEventListener('click', boundOverlayClick);
  }
}
// Функция закрытия модального окна 
function closeModal(modalElement) {
  if (modalElement != null) {
      modalElement.classList.remove('popup_open');;
      document.removeEventListener('keydown', modalElement.boundEscClose);
  }
}

export { openModal, closeModal };
