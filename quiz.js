// quiz.js — Quiz over het goede doel
(() => {
  // ✅ Pas hier je eigen goede doel inhoud aan
  const quiz = [
    {
      q: "Wat is het belangrijkste doel van ons project?",
      choices: [
        "Alleen toerisme promoten",
        "Bewustwording en hulp organiseren via een goed doel",
        "Een game bouwen",
        "Een online winkel starten"
      ],
      correct: 1,
      explain: "We gebruiken de website om bewustwording te creëren en steun te organiseren voor een goed doel."
    },
    {
      q: "Waarvoor worden donaties meestal gebruikt bij een goed doel?",
      choices: [
        "Voor persoonlijke winst",
        "Voor activiteiten/programma’s die het doel ondersteunen",
        "Voor willekeurige uitgaven zonder plan",
        "Alleen voor reclame"
      ],
      correct: 1,
      explain: "Donaties gaan naar concrete activiteiten: projecten, materialen, ondersteuning, campagnes en uitvoering."
    },
    {
      q: "Welke factor maakt een goed doel betrouwbaar?",
      choices: [
        "Geen transparantie over besteding",
        "Duidelijke doelen + transparante verantwoording",
        "Alleen veel volgers op social media",
        "Geen contactinformatie"
      ],
      correct: 1,
      explain: "Transparantie en verantwoording (rapportage, doelen, resultaten) zijn heel belangrijk."
    },
    {
      q: "Waarom is onderwijs vaak een belangrijk thema binnen goede doelen?",
      choices: [
        "Omdat het alleen leuk is",
        "Omdat onderwijs kansen vergroot en armoede kan doorbreken",
        "Omdat het altijd gratis is",
        "Omdat iedereen meteen rijk wordt"
      ],
      correct: 1,
      explain: "Onderwijs vergroot kansen, vaardigheden en toekomstperspectief en kan armoede verminderen."
    },
    {
      q: "Wat kun jij doen naast doneren om te helpen?",
      choices: [
        "Niks, alleen geld telt",
        "Informatie delen, meewerken, acties organiseren",
        "Alleen kritiek geven",
        "Alles geheimhouden"
      ],
      correct: 1,
      explain: "Naast geld helpt ook: delen, vrijwilligerswerk, acties opzetten en anderen motiveren."
    }
  ];

  // Elements
  const qIndexEl = document.getElementById("qIndex");
  const qTotalEl = document.getElementById("qTotal");
  const scoreEl = document.getElementById("scoreNow");
  const qTextEl = document.getElementById("questionText");
  const answersEl = document.getElementById("answers");
  const nextBtn = document.getElementById("nextBtn");
  const restartBtn = document.getElementById("restartBtn");

  const explainBox = document.getElementById("explainBox");
  const explainTitle = document.getElementById("explainTitle");
  const explainText = document.getElementById("explainText");

  const resultBox = document.getElementById("resultBox");
  const resultScore = document.getElementById("resultScore");
  const resultMessage = document.getElementById("resultMessage");
  const resultTip = document.getElementById("resultTip");

  const progressFill = document.getElementById("progressFill");

  // State
  let idx = 0;
  let score = 0;
  let locked = false;

  qTotalEl.textContent = String(quiz.length);

  function setProgress() {
    const pct = Math.round(((idx) / quiz.length) * 100);
    progressFill.style.width = `${pct}%`;
  }

  function showQuestion() {
    locked = false;
    nextBtn.disabled = true;
    explainBox.classList.remove("show");
    resultBox.classList.remove("show");

    const item = quiz[idx];
    qIndexEl.textContent = String(idx + 1);
    scoreEl.textContent = String(score);
    qTextEl.textContent = item.q;

    // answers
    answersEl.innerHTML = "";
    item.choices.forEach((text, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "answer-btn";
      btn.textContent = text;
      btn.addEventListener("click", () => handleAnswer(i, btn));
      answersEl.appendChild(btn);
    });

    setProgress();
  }

  function handleAnswer(choiceIndex, clickedBtn) {
    if (locked) return;
    locked = true;

    const item = quiz[idx];
    const buttons = [...answersEl.querySelectorAll(".answer-btn")];
    buttons.forEach(b => b.disabled = true);

    const correctIndex = item.correct;
    const correctBtn = buttons[correctIndex];

    if (choiceIndex === correctIndex) {
      score++;
      clickedBtn.classList.add("correct");
      explainTitle.textContent = "Goed! ✅";
      explainText.textContent = item.explain;
    } else {
      clickedBtn.classList.add("wrong");
      correctBtn.classList.add("correct");
      explainTitle.textContent = "Helaas, dat is niet goed. ❌";
      explainText.textContent = `Juiste antwoord: "${item.choices[correctIndex]}". ${item.explain}`;
    }

    scoreEl.textContent = String(score);
    explainBox.classList.add("show");
    nextBtn.disabled = false;

    // Progress “tikt” na beantwoorden alvast door (nice UX)
    const pct = Math.round(((idx + 1) / quiz.length) * 100);
    progressFill.style.width = `${pct}%`;
  }

  function showResult() {
    answersEl.innerHTML = "";
    qTextEl.textContent = "Quiz afgerond!";
    nextBtn.disabled = true;
    explainBox.classList.remove("show");

    resultScore.textContent = `${score}/${quiz.length}`;

    // motiverende tekst op basis van score
    const ratio = score / quiz.length;

    if (ratio === 1) {
      resultMessage.textContent = "Perfect! Jij weet precies waar het goede doel voor staat. 🔥";
      resultTip.textContent = "Tip: deel de website met iemand die dit onderwerp ook interessant vindt.";
    } else if (ratio >= 0.8) {
      resultMessage.textContent = "Super gedaan! Je hebt veel kennis over het goede doel. 💪";
      resultTip.textContent = "Tip: kijk nog even bij 'Doelstelling' om de impact nóg beter te begrijpen.";
    } else if (ratio >= 0.6) {
      resultMessage.textContent = "Netjes! Je zit al goed op weg. ✅";
      resultTip.textContent = "Tip: lees de pagina’s over het land en het probleemgebied om je score te boosten.";
    } else if (ratio >= 0.4) {
      resultMessage.textContent = "Goede poging! Je kunt nog wat bijleren.;
      resultTip.textContent = "Tip: herlees de belangrijkste pagina’s en probeer de quiz daarna opnieuw.";
    } else {
      resultMessage.textContent = "Komt goed! Dit is een mooie start.";
      resultTip.textContent = "Tip: neem 5 minuten om de basisinfo door te lezen en probeer daarna opnieuw.";
    }

    resultBox.classList.add("show");
    // Zet progress op 100%
    progressFill.style.width = "100%";
  }

  nextBtn.addEventListener("click", () => {
    if (idx < quiz.length - 1) {
      idx++;
      showQuestion();
    } else {
      showResult();
    }
  });

  restartBtn.addEventListener("click", () => {
    idx = 0;
    score = 0;
    locked = false;
    progressFill.style.width = "0%";
    showQuestion();
  });

  // init
  showQuestion();
})();