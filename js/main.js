window.onload = () => {
    "use strict";

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js");
    }
};

const btnDownloadPWA = document.getElementById('btnDownloadPWA')
let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can install the PWA
    btnDownloadPWA.style.display = 'inline-block'
});
window.addEventListener("appinstalled", () => {
    btnDownloadPWA.innerText = "Installed";
});

async function handleInstallClick() {
    console.log("deferredPrompt", deferredPrompt);
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
};

btnDownloadPWA.addEventListener('click', handleInstallClick)