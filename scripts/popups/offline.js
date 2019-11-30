function toggleOfflineModal() {
    var modal = document.querySelector(".offlinemsg");
    modal.classList.toggle("show-offlinemsg");
}

window.addEventListener('online',  toggleOfflineModal);
window.addEventListener('offline', toggleOfflineModal);