const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    // store triggering event
    window.deferredPrompt = event;
});

butInstall.addEventListener('click', async () => {
    console.log('the button was clicked');
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
});