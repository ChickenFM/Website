//Settings popup
var modal = document.querySelector(".settings");
var trigger = document.querySelector(".triggerSettings");
var closeButton = document.querySelector(".close-settings");

function toggleModal() {
    modal.classList.toggle("show-settings");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);