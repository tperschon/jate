const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    // store triggering event
    window.deferredPrompt = event;
    // make sure button is not hidden if not installed
    butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
    // retrieve stored event
    const deferredPrompt = window.deferredPrompt;
    // if nothing was retrieved, end the function now
    if(!deferredPrompt) {
        return;
    };
    // prompt with stored event
    deferredPrompt.prompt();
    // reset the stored event so we don't use it again by mistake
    window.deferredPrompt = null;
});

window.addEventListener('appinstalled', (event) => {
    // reset the stored event so we dont use it again, may be redundant with other reset
    window.deferredPrompt = null;
    // hide the install button once installed
    butInstall.classList.toggle('hidden', true);
});