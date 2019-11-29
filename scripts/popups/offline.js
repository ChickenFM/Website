function toggleModal() {
    var modal = document.querySelector(".offlinemsg");
    modal.classList.toggle("show-offlinemsg");
}

window.addEventListener('online',  toggleModal);
window.addEventListener('offline', toggleModal);