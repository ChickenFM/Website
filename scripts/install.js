window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);
deferredInstallPrompt = evt;
installButton.removeAttribute('hidden');

deferredInstallPrompt.prompt();

evt.srcElement.setAttribute('hidden', true);