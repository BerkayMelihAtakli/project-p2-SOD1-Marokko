// donatieformulier/donatie.js
// PV1502 - Donatie progress met animatie

(() => {
  // Startwaarden (eis: basisbedrag)
  const GOAL = 5000;
  let raised = 0;

  // Elements
  const raisedEl = document.getElementById("raisedAmount");
  const goalEl = document.getElementById("goalAmount");
  const percentEl = document.getElementById("percentAmount");
  const fillEl = document.getElementById("progressFill");
  const remainingEl = document.getElementById("remainingText");
  const barEl = document.querySelector(".progress-bar");

  const form = document.getElementById("donatieForm");
  const amountInput = document.getElementById("bedrag");

  if (!form || !amountInput || !fillEl) return;

  // Format helpers (NL geld)
  const fmtMoney = (n) =>
    new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(n);

  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

  function setUI(animated = true) {
    const percent = clamp((raised / GOAL) * 100, 0, 100);

    // Teksten
    raisedEl.textContent = fmtMoney(raised);
    goalEl.textContent = fmtMoney(GOAL);
    percentEl.textContent = `${Math.round(percent)}%`;

    const remaining = Math.max(GOAL - raised, 0);
    remainingEl.textContent =
      remaining > 0 ? `Nog ${fmtMoney(remaining)} te gaan` : `Doel behaald! 🎉`;

    // aria
    barEl?.setAttribute("aria-valuemax", String(GOAL));
    barEl?.setAttribute("aria-valuenow", String(raised));

    // Balk (met animatie via CSS transition)
    if (!animated) {
      fillEl.style.transition = "none";
      fillEl.style.width = `${percent}%`;
      // force reflow
      void fillEl.offsetWidth;
      fillEl.style.transition = "";
    } else {
      fillEl.style.width = `${percent}%`;
    }
  }

  setUI(false);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const raw = amountInput.value;
    const donation = Number(raw);

    if (!Number.isFinite(donation) || donation <= 0) {
      amountInput.setCustomValidity("Vul een geldig bedrag in.");
      form.reportValidity();
      amountInput.setCustomValidity("");
      return;
    }

    const before = raised;
    raised = Math.round((raised + donation) * 100) / 100;

    const fromPercent = clamp((before / GOAL) * 100, 0, 100);
    const toPercent = clamp((raised / GOAL) * 100, 0, 100);

    fillEl.style.width = `${fromPercent}%`;
    void fillEl.offsetWidth; // reflow
    fillEl.style.width = `${toPercent}%`;
    setUI(true);

    form.reset();
  });
})();