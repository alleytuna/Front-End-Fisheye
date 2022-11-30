/* eslint-disable no-unused-vars */

const modal = document.getElementById("contact_modal");
const modalCloseButton = document.querySelector(".closeModalButton");
const modalSurnameInput = document.getElementById("surname");
const modalLastnameInput = document.getElementById("lastname");
const modalEmailInput = document.getElementById("email");
const modalMessageInput = document.getElementById("message");

const mainSection = document.getElementById("main");

function displayModal() {
  modal.style.display = "block";
  modalCloseButton.focus();

  mainSection.setAttribute('aria-hidden', 'true');
  modal.setAttribute('aria-hidden', 'false');
  
  modalSurnameInput.addEventListener('change', function(e) {
    e.preventDefault();
    console.log(modalSurnameInput.value)
  })
  modalLastnameInput.addEventListener('change', function(e) {
    e.preventDefault();
    console.log(modalLastnameInput.value)
  })  
  modalEmailInput.addEventListener('change', function(e) {
    e.preventDefault();
    console.log(modalEmailInput.value)
  })  
  modalMessageInput.addEventListener('change', function(e) {
    e.preventDefault();
    console.log(modalMessageInput.value)
  })
}

function closeModal() {
  modal.style.display = "none";

  mainSection.setAttribute('aria-hidden', 'false');
  modal.setAttribute('aria-hidden', 'true');
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});
