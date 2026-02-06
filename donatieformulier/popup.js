// popup.js - bulletproof versie
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("donatiePopup");

  if (!popup) {
    console.log("Popup element niet gevonden (#donatiePopup).");
    return;
  }

  function showPopup() {
    popup.classList.add("show");
  }

  function hidePopup() {
    popup.classList.remove("show");
  }

  // ✅ CAPTURE listener: werkt zelfs als andere scripts propagation stoppen
  document.addEventListener(
    "click",
    (e) => {
      // Klik op de X
      if (e.target.closest("#popupClose")) {
        e.preventDefault();
        hidePopup();
        return;
      }

      // Klik buiten de box (op overlay) sluit ook
      if (e.target === popup) {
        hidePopup();
        return;
      }
    },
    true // <-- capture!
  );

  // ESC sluit
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hidePopup();
  });

  // Elke 3 minuten tonen
  setInterval(showPopup, 180000);
});