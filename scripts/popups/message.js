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
var listener = addEventListener('blur', function() {
	if(document.activeElement === document.getElementById('messageFrame')) {
        console.log('e')
		setTimeout(function(){
            resizeIframe(frameObj)
        }, 3000)
	}
});
msgtrigger.addEventListener("click", toggleMsgModal);
msgcloseButton.addEventListener("click", toggleMsgModal);
window.addEventListener("click", windowOnClick);