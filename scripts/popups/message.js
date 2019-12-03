//message popup
var msgmodal = document.querySelector(".messagepop");
var msgtrigger = document.querySelector(".triggerMessagepop");
var msgcloseButton = document.querySelector(".close-messagepop");

function toggleMsgModal() {
    msgmodal.classList.toggle("show-messagepop");
}

function windowOnClick(event) {
    if (event.target === msgmodal) {
        toggleMsgModal();
    }
}

msgtrigger.addEventListener("click", toggleMsgModal);
msgcloseButton.addEventListener("click", toggleMsgModal);
window.addEventListener("click", windowOnClick);