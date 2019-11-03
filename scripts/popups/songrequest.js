//request popup
var songreq = document.querySelector(".songreq");
var songreqTrigger = document.querySelector(".triggerSongreq");
var songreqCloseButton = document.querySelector(".songreq-close-button");

function toggleSongreq() {
    songreq.classList.toggle("show-songreq");
}

function songreqOnClick(event) {
    if (event.target === songreq) {
        toggleSongreq();
    }
}

songreqTrigger.addEventListener("click", toggleSongreq);
songreqCloseButton.addEventListener("click", toggleSongreq);
window.addEventListener("click", songreqOnClick);
