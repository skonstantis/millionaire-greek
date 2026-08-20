const LEVELS = [{"amount":100,"safe":false,"lockMs":7000,"difficulty":1},{"amount":200,"safe":false,"lockMs":8000,"difficulty":2},{"amount":300,"safe":false,"lockMs":9000,"difficulty":3},{"amount":400,"safe":false,"lockMs":10000,"difficulty":4},{"amount":500,"safe":true,"lockMs":11000,"difficulty":5},{"amount":1000,"safe":false,"lockMs":12500,"difficulty":6},{"amount":2000,"safe":false,"lockMs":14000,"difficulty":7},{"amount":3000,"safe":false,"lockMs":15500,"difficulty":8},{"amount":4000,"safe":false,"lockMs":17000,"difficulty":9},{"amount":5000,"safe":true,"lockMs":19000,"difficulty":10},{"amount":7500,"safe":false,"lockMs":20250,"difficulty":11},{"amount":10000,"safe":false,"lockMs":21500,"difficulty":12},{"amount":20000,"safe":false,"lockMs":24000,"difficulty":13},{"amount":30000,"safe":false,"lockMs":27000,"difficulty":14},{"amount":100000,"safe":false,"lockMs":30000,"difficulty":15}];
const LETTERS = ["A","B","Γ","Δ"];

const $ = id => document.getElementById(id);

/* ---- Data layer: runtime bank built from questions.js + user additions ---- */
const USER_Q_KEY = "millionaireUserQuestionsV1";
const CUSTOM_DRAFT_KEY = "millionaireCustomDraftV1";

/* One entry per money rung (difficulty 1-15) for the "add question" form.
   The chosen rung's amount becomes the question's difficulty/level. */
const PRICE_BANDS = LEVELS.map((lvl,i) => ({
  value:i + 1,
  label:"€" + Number(lvl.amount).toLocaleString("el-GR") + (lvl.safe ? " (ασφαλές)" : "")
}));

const CATEGORIES = CATEGORY_ORDER.map(key => ({key, label: QUESTION_DATA[key].label}));

function normalizeBank() {
  const out = [];
  CATEGORY_ORDER.forEach(key => {
    const cat = QUESTION_DATA[key];
    cat.questions.forEach((q, i) => {
      out.push({
        id: key + "-d" + q.d + "-" + i,
        category: key,
        categoryLabel: cat.label,
        difficulty: q.d,
        question: q.q,
        options: q.o.slice(),
        correct: q.c,
        trivia: q.t || "",
        source: q.s || ""
      });
    });
  });
  return out;
}

function loadUserQuestions() {
  try {
    const arr = JSON.parse(localStorage.getItem(USER_Q_KEY));
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveUserQuestions(list) {
  localStorage.setItem(USER_Q_KEY, JSON.stringify(list));
}

/* Per-player memory of already-seen questions (keyed by lowercased name).
   A named player never gets the same question twice; blank name = no memory. */
const SEEN_KEY = "millionairePlayerSeenV1";

function loadSeen() {
  try {
    const o = JSON.parse(localStorage.getItem(SEEN_KEY));
    return o && typeof o === "object" ? o : {};
  } catch {
    return {};
  }
}

function saveSeen(store) {
  localStorage.setItem(SEEN_KEY, JSON.stringify(store));
}

function persistPlayerSeen() {
  if (!game || !game.playerKey || !game.playerSeen) return;
  const store = loadSeen();
  store[game.playerKey] = Array.from(game.playerSeen).slice(-4000);
  saveSeen(store);
}

const BASE_QUESTIONS = normalizeBank();
let userQuestions = loadUserQuestions();
let allQuestions = BASE_QUESTIONS.concat(userQuestions);

function rebuildAllQuestions() {
  allQuestions = BASE_QUESTIONS.concat(userQuestions);
}

let selectedCategories = new Set();   // empty = all categories
let adminMode = false;                // host tools: reveal / skip / free swap
let wheelEnabled = true;              // Wheel of Fortune spins before each question
let modTimer = null;                  // countdown timer for the "hot potato" modifier
let bettingEnabled = true;            // spectators bet on the player before each question

/* Quick dares handed to spectators who lose a bet (or to a "snitch"). */
const MINI_DARES = [
  "μία γκριμάτσα για 5 δευτερόλεπτα",
  "ένα κοπλιμέντο στον παίκτη",
  "5 καθίσματα",
  "μία στροφή βαλς μόνος/η σου",
  "μιμήσου ένα ζώο",
  "πες κάτι στα «αγγλικά» με βαρύ ελληνικό στιλ",
  "τραγούδα μία στροφή απ' το αγαπημένο σου",
  "κάνε τον ήχο ενός σεισμού",
  "5 δευτερόλεπτα plank",
  "πες ένα ανέκδοτο (κακό επιτρέπεται)"
];

/* Wheel of Rewards & Punishments — real-life family dares (not money).
   Each spin sets the stake for the question: a REWARD you get if you answer
   correctly, or a PUNISHMENT you do if you get it wrong. The host enforces it. */
const WHEEL = [
  {id:"boss",    emoji:"👑", color:"#f1b32c", weight:1, type:"reward", name:"Αρχηγός", text:"Όλοι σε φωνάζουν «Αρχηγέ» μέχρι το επόμενο λάθος!"},
  {id:"judge",   emoji:"🎯", color:"#fb923c", weight:1, type:"reward", name:"Δικαστής", text:"Δίνεις μία ποινή σε όποιον θέλεις — τώρα!"},
  {id:"clap",    emoji:"👏", color:"#2ebc75", weight:1, type:"reward", name:"Χειροκρότημα", text:"Όλοι σε χειροκροτούν όρθιοι!"},
  {id:"immune",  emoji:"🛡️", color:"#38bdf8", weight:1, type:"reward", name:"Ασυλία", text:"Την επόμενη ποινή σου τη δίνεις σε άλλον!"},
  {id:"love",    emoji:"💖", color:"#f472b6", weight:1, type:"reward", name:"Κοπλιμέντα", text:"Κάθε παίκτης λέει κάτι που θαυμάζει σε σένα!"},
  {id:"treat",   emoji:"☕", color:"#22d3ee", weight:1, type:"reward", name:"Κέρασμα", text:"Ο χαμένος του γύρου σού φέρνει ό,τι θες να πιεις!"},
  {id:"karaoke", emoji:"🎤", color:"#df5063", weight:1, type:"punishment", name:"Καραόκε Φώτη", text:"Τραγούδα (φάλτσα) ένα τραγούδι του Φώτη!"},
  {id:"gym",     emoji:"💪", color:"#e11d48", weight:1, type:"punishment", name:"Γυμναστική", text:"Κάνε 10 καθίσματα ή push-ups, τώρα!"},
  {id:"dance",   emoji:"🕺", color:"#a78bfa", weight:1, type:"punishment", name:"Ζεϊμπέκικο", text:"Χόρεψε ζεϊμπέκικο 15 δευτερόλεπτα, με κέφι!"},
  {id:"talk",    emoji:"🗣️", color:"#818cf8", weight:1, type:"punishment", name:"Σαν τον Φώτη", text:"Μίλα σαν τον Φώτη μέχρι την επόμενη ερώτηση!"},
  {id:"animal",  emoji:"🐔", color:"#84cc16", weight:1, type:"punishment", name:"Ζωικοί ήχοι", text:"Κάνε 3 ζώα που θα διαλέξουν οι άλλοι!"},
  {id:"quake",   emoji:"🌍", color:"#64748b", weight:1, type:"punishment", name:"Σεισμός", text:"Μίμηση σεισμού με ουρλιαχτό πανικού για 5 δευτ.!"}
];


let game = null;
let lockTimer = null;
let currentAudio = null;
let audienceTimer = null;
let questionAudioToken = 0;
let suspenseAllowed = false;
let audioTransitioning = false;
let playFadeTimer = null;
let playFadeFrame = null;

function formatAmount(v) {
  return "€" + Number(v).toLocaleString("el-GR");
}

function showScreen(name) {
  $("setupScreen").classList.toggle("hidden",name !== "setup");
  $("gameScreen").classList.toggle("hidden",name !== "game");
  $("endScreen").classList.toggle("hidden",name !== "end");
}

function stopAudio(audio) {
  if (!audio) return;
  audio.pause();
  try { audio.currentTime = 0; } catch {}
}

function playExclusive(id,onEnded) {
  if (currentAudio) stopAudio(currentAudio);

  const audio = $(id);
  stopAudio(audio);
  currentAudio = audio;

  const done = () => {
    if (currentAudio === audio) currentAudio = null;
    if (typeof onEnded === "function") onEnded();
  };

  audio.addEventListener("ended",done,{once:true});
  audio.addEventListener("error",done,{once:true});

  const p = audio.play();

  if (p && p.catch) {
    p.catch(() => {
      if (currentAudio === audio) currentAudio = null;
    });
  }
}

function clearTimers() {
  clearTimeout(lockTimer);
  clearInterval(audienceTimer);
  clearTimeout(playFadeTimer);

  if (playFadeFrame !== null) {
    cancelAnimationFrame(playFadeFrame);
  }

  if (modTimer !== null) {
    clearInterval(modTimer);
    modTimer = null;
  }

  lockTimer = null;
  audienceTimer = null;
  playFadeTimer = null;
  playFadeFrame = null;
}

function shouldUseSuspense() {
  return Boolean(game && LEVELS[game.levelIndex].amount > 500);
}

function invalidateQuestionAudio() {
  questionAudioToken += 1;
  suspenseAllowed = false;
}

function resetAudioElement(audio) {
  if (!audio) return;

  audio.pause();
  audio.volume = 1;

  try {
    audio.currentTime = 0;
  } catch {}
}

function stopSuspense() {
  suspenseAllowed = false;

  const audio = $("soundSuspense");

  audio.loop = false;
  resetAudioElement(audio);

  if (currentAudio === audio) {
    currentAudio = null;
  }
}

function stopQuestionBedHard() {
  suspenseAllowed = false;

  const playAudio = $("soundPlay");
  const suspenseAudio = $("soundSuspense");

  suspenseAudio.loop = false;

  resetAudioElement(playAudio);
  resetAudioElement(suspenseAudio);

  if (
    currentAudio === playAudio ||
    currentAudio === suspenseAudio
  ) {
    currentAudio = null;
  }
}

function fadeOutAudio(audio,durationMs = 1200) {
  return new Promise(resolve => {
    if (!audio || audio.paused) {
      if (audio) audio.volume = 1;
      resolve();
      return;
    }

    const startVolume =
      Number.isFinite(audio.volume)
        ? audio.volume
        : 1;

    const startedAt = performance.now();

    const step = now => {
      if (audio.paused) {
        audio.volume = 1;
        resolve();
        return;
      }

      const progress = Math.min(
        1,
        (now - startedAt) / durationMs
      );

      const smooth =
        progress * progress * (3 - 2 * progress);

      audio.volume = Math.max(
        0,
        startVolume * (1 - smooth)
      );

      if (progress >= 1) {
        audio.volume = 0;
        resolve();
        return;
      }

      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  });
}

async function fadeOutQuestionBed(durationMs = 1200) {
  suspenseAllowed = false;

  const playAudio = $("soundPlay");
  const suspenseAudio = $("soundSuspense");

  const active = [];

  if (!playAudio.paused) active.push(playAudio);
  if (!suspenseAudio.paused) active.push(suspenseAudio);

  if (active.length) {
    await Promise.all(
      active.map(audio => fadeOutAudio(audio,durationMs))
    );
  }

  stopQuestionBedHard();
}

function startSuspenseLoop(token) {
  if (
    token !== questionAudioToken ||
    !suspenseAllowed ||
    audioTransitioning ||
    !game ||
    game.finished ||
    game.locked ||
    game.resultResolved ||
    !shouldUseSuspense()
  ) {
    return;
  }

  const audio = $("soundSuspense");

  if (currentAudio && currentAudio !== audio) {
    stopAudio(currentAudio);
  }

  audio.pause();
  audio.loop = true;
  audio.volume = 1;

  try {
    audio.currentTime = 0;
  } catch {}

  currentAudio = audio;

  const p = audio.play();

  if (p && p.catch) {
    p.catch(() => {
      if (currentAudio === audio) {
        currentAudio = null;
      }
    });
  }
}

function playQuestionAudio() {
  const token = ++questionAudioToken;
  const audio = $("soundPlay");
  const fadeMs = 1200;

  audioTransitioning = false;
  suspenseAllowed = true;
  stopQuestionBedHard();
  suspenseAllowed = true;

  clearTimeout(playFadeTimer);

  if (playFadeFrame !== null) {
    cancelAnimationFrame(playFadeFrame);
    playFadeFrame = null;
  }

  if (currentAudio && currentAudio !== audio) {
    stopAudio(currentAudio);
  }

  audio.pause();
  audio.volume = 1;

  try {
    audio.currentTime = 0;
  } catch {}

  currentAudio = audio;

  let finished = false;

  const cleanup = () => {
    clearTimeout(playFadeTimer);
    playFadeTimer = null;

    if (playFadeFrame !== null) {
      cancelAnimationFrame(playFadeFrame);
      playFadeFrame = null;
    }

    audio.removeEventListener("ended",handleEnded);
    audio.removeEventListener("error",handleError);
    audio.removeEventListener("loadedmetadata",scheduleFade);
    audio.removeEventListener("durationchange",scheduleFade);

    audio.volume = 1;

    if (currentAudio === audio) {
      currentAudio = null;
    }
  };

  const startSuspenseIfValid = () => {
    if (
      token === questionAudioToken &&
      suspenseAllowed &&
      !audioTransitioning &&
      game &&
      !game.locked &&
      !game.resultResolved &&
      !game.finished &&
      shouldUseSuspense()
    ) {
      startSuspenseLoop(token);
    }
  };

  const finish = () => {
    if (finished) return;
    finished = true;
    cleanup();
    startSuspenseIfValid();
  };

  const runFade = () => {
    if (
      finished ||
      token !== questionAudioToken ||
      audio.paused
    ) {
      return;
    }

    const startedAt = performance.now();
    const startVolume = audio.volume;

    const step = now => {
      if (
        finished ||
        token !== questionAudioToken ||
        audio.paused
      ) {
        return;
      }

      const progress = Math.min(
        1,
        (now - startedAt) / fadeMs
      );

      const smooth =
        progress * progress * (3 - 2 * progress);

      audio.volume = Math.max(
        0,
        startVolume * (1 - smooth)
      );

      if (progress >= 1) {
        audio.pause();
        finish();
        return;
      }

      playFadeFrame = requestAnimationFrame(step);
    };

    playFadeFrame = requestAnimationFrame(step);
  };

  const scheduleFade = () => {
    clearTimeout(playFadeTimer);

    if (
      !Number.isFinite(audio.duration) ||
      audio.duration <= 0
    ) {
      return;
    }

    const remainingBeforeFadeMs =
      Math.max(
        0,
        audio.duration * 1000 - fadeMs
      );

    playFadeTimer = setTimeout(
      runFade,
      remainingBeforeFadeMs
    );
  };

  const handleEnded = () => {
    finish();
  };

  const handleError = () => {
    finish();
  };

  audio.addEventListener("ended",handleEnded,{once:true});
  audio.addEventListener("error",handleError,{once:true});
  audio.addEventListener("loadedmetadata",scheduleFade);
  audio.addEventListener("durationchange",scheduleFade);

  const p = audio.play();

  scheduleFade();

  if (p && p.catch) {
    p.catch(() => {
      cleanup();
    });
  }
}

function questionMatchesFilter(q,cats) {
  return cats.size === 0 || cats.has(q.category);
}

/* Returns a fresh copy with the four options shuffled and `correct` updated,
   so the right answer is never stuck in the same position. */
function prepareQuestion(raw) {
  const order = [0,1,2,3];

  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i],order[j]] = [order[j],order[i]];
  }

  const options = order.map(i => raw.options[i]);
  const correct = order.indexOf(raw.correct);

  return Object.assign({},raw,{options,correct});
}

/* Picks a raw question for a ladder level, honouring the chosen categories and
   the level's difficulty, and avoiding questions already used this game.
   Falls back progressively so the game never runs out of questions. */
function pickQuestion(levelIndex) {
  const difficulty = LEVELS[levelIndex].difficulty;
  const cats = game.categories;
  const used = game.usedIds;
  const seen = game.playerSeen;   // Set for a named player, else null

  const inFilter = allQuestions.filter(q => questionMatchesFilter(q,cats));
  const base = inFilter.length ? inFilter : allQuestions;

  // "fresh" = not used this game and (for a named player) not seen in past games
  const fresh = q => !used.has(q.id) && (!seen || !seen.has(q.id));

  const tiers = [
    q => fresh(q) && q.difficulty === difficulty,
    q => fresh(q) && Math.abs(q.difficulty - difficulty) <= 1,
    q => fresh(q),
    // player has exhausted their fresh pool — relax the cross-game memory
    q => !used.has(q.id) && q.difficulty === difficulty,
    q => !used.has(q.id) && Math.abs(q.difficulty - difficulty) <= 1,
    q => !used.has(q.id),
    q => q.difficulty === difficulty,
    () => true
  ];

  let pool = [];

  for (const test of tiers) {
    pool = base.filter(test);
    if (pool.length) break;
  }

  const selected = pool[Math.floor(Math.random() * pool.length)];

  if (selected) {
    used.add(selected.id);
    if (seen) {
      seen.add(selected.id);
      persistPlayerSeen();
    }
  }

  return selected;
}

function buildLadder() {
  $("ladder").innerHTML = "";
  LEVELS.forEach((level,index) => {
    const li = document.createElement("li");
    if (level.safe) li.classList.add("safe");
    li.innerHTML = `<span>${index + 1}</span><strong>${formatAmount(level.amount)}</strong>`;
    $("ladder").appendChild(li);
  });
}

function updateLadder() {
  document.querySelectorAll("#ladder li").forEach((li,index) => {
    li.classList.toggle("current",index === game.levelIndex && !game.finished);
  });
}

function resetQuestionUi() {
  $("continueWrap").classList.add("hidden");
  $("revealAnswerBtn").classList.remove("is-peeking");

  document.querySelectorAll(".answer").forEach(el => {
    el.classList.remove("host-peek");
  });
}

function canUseLifelines() {
  return Boolean(
    game &&
    game.currentQuestion &&
    !game.finished &&
    !game.locked &&
    !game.resultResolved &&
    !audioTransitioning
  );
}

function renderLifelines() {
  const map = [
    ["fiftyBtn","fifty"],
    ["phoneBtn","phone"],
    ["audienceBtn","audience"],
    ["changeBtn","change"]
  ];

  const available = canUseLifelines();

  map.forEach(([id,key]) => {
    const btn = $(id);
    const used = Boolean(game && game.lifelines[key]);

    // "Change" pulls a replacement from the pool, which a custom session has none of.
    const blockedByMode = key === "change" && game && game.mode === "custom";

    btn.disabled = !available || used || blockedByMode;
    btn.classList.toggle("used",used);
    btn.setAttribute("aria-pressed",used ? "true" : "false");
  });
}

function totalLevels() {
  return game && game.mode === "custom"
    ? Math.min(LEVELS.length,game.customQueue.length)
    : LEVELS.length;
}

function baseGameState() {
  return {
    levelIndex:0,
    currentQuestion:null,
    locked:false,
    resultResolved:false,
    lockedAnswerIndex:null,
    lastResult:null,
    wonAmount:0,
    safeAmount:0,
    correctCount:0,
    finished:false,
    pendingFinishPayout:null,
    fiftyRemovedIndices:[],
    mode:"normal",
    categories:new Set(),
    usedIds:new Set(),
    playerName:"",
    playerKey:"",
    playerSeen:null,
    customQueue:null,
    bonus:0,
    modifier:null,
    blind:false,
    spectators:[],
    bets:null,
    betScores:{},
    lifelines:{
      fifty:false,
      phone:false,
      audience:false,
      change:false
    }
  };
}

function resetEngine() {
  clearTimers();
  invalidateQuestionAudio();
  audioTransitioning = false;
  stopQuestionBedHard();
  if (currentAudio) stopAudio(currentAudio);
}

function startGame() {
  resetEngine();

  game = baseGameState();
  game.categories = new Set(selectedCategories);

  const nameEl = $("playerName");
  const name = nameEl ? nameEl.value.trim() : "";
  game.playerName = name;
  game.playerKey = name.toLowerCase();
  game.playerSeen = name ? new Set(loadSeen()[game.playerKey] || []) : null;

  const specEl = $("spectators");
  const specRaw = specEl ? specEl.value : "";
  game.spectators = specRaw.split(",").map(s => s.trim()).filter(Boolean).slice(0,10);
  game.betScores = {};

  buildLadder();
  showScreen("game");
  showReady(true);
  playExclusive("soundIntro");
}

function startCustomGame(queue) {
  resetEngine();

  game = baseGameState();
  game.mode = "custom";
  game.customQueue = queue;

  buildLadder();
  showScreen("game");
  showReady(true);
  playExclusive("soundIntro");
}

function showReady(first,ending = false) {
  invalidateQuestionAudio();
  audioTransitioning = false;
  stopQuestionBedHard();
  resetQuestionUi();
  $("questionStage").classList.add("hidden");
  $("preQuestionStage").classList.remove("hidden");

  const level = LEVELS[game.levelIndex];
  $("questionCounter").textContent = `${game.levelIndex + 1}/${totalLevels()}`;

  const badge = $("playerBadge");
  if (badge) {
    badge.textContent = game.playerName ? `Παίκτης: ${game.playerName}` : "";
    badge.classList.toggle("hidden",!game.playerName);
  }

  if (first) {
    $("amountDisplay").textContent = formatAmount(level.amount);
    $("preQuestionTitle").textContent = "Έτοιμοι;";
    $("showQuestionBtn").textContent = "Ερώτηση";
    $("stopGameBtn").classList.add("hidden");
    $("triviaCard").classList.add("hidden");
  } else {
    const q = game.currentQuestion;
    const verification = q && q.verifiedBy ? ` · Έλεγχος: ${q.verifiedBy}` : "";
    const source = q && q.source ? `Πηγή: ${q.source}${verification}` : "";

    $("triviaText").textContent = q && q.trivia
      ? q.trivia
      : "Η σωστή απάντηση καταγράφηκε.";
    $("triviaSource").textContent = source;
    $("triviaCard").classList.remove("hidden");

    if (ending) {
      $("amountDisplay").textContent = formatAmount(game.pendingFinishPayout || 0);
      $("preQuestionTitle").textContent = game.lastResult === "wrong"
        ? "Τέλος παιχνιδιού"
        : "Ολοκληρώθηκε!";
      $("showQuestionBtn").textContent = "Αποτελέσματα";
      $("stopGameBtn").classList.add("hidden");
    } else {
      $("amountDisplay").textContent = formatAmount(level.amount);
      $("preQuestionTitle").textContent = `Επόμενη: ${formatAmount(level.amount)}`;
      $("showQuestionBtn").textContent = "Ερώτηση";
      $("stopGameBtn").classList.remove("hidden");
    }
  }

  updateLadder();
}

function showQuestion() {
  clearTimers();
  invalidateQuestionAudio();
  audioTransitioning = false;
  stopQuestionBedHard();
  resetQuestionUi();

  game.locked = false;
  game.resultResolved = false;
  game.lockedAnswerIndex = null;
  game.fiftyRemovedIndices = [];
  game.modifier = null;
  game.blind = false;

  const level = LEVELS[game.levelIndex];
  const raw = game.mode === "custom"
    ? game.customQueue[game.levelIndex]
    : pickQuestion(game.levelIndex);
  game.currentQuestion = prepareQuestion(raw);

  $("preQuestionStage").classList.add("hidden");
  $("questionStage").classList.remove("hidden");
  $("questionCounter").textContent = `${game.levelIndex + 1}/${totalLevels()}`;
  $("amountDisplay").textContent = formatAmount(level.amount);
  updateBonusDisplay();

  const reveal = () => {
    const bres = $("betResults");
    if (bres) bres.classList.add("hidden");
    const snitch = $("snitchBtn");
    if (snitch) {
      const on = bettingEnabled && game.spectators && game.spectators.length > 0;
      snitch.classList.toggle("hidden",!on);
    }
    renderQuestion();
    renderLifelines();
    updateAdminUI();
    updateBonusDisplay();
    if (game.modifier && game.modifier.kind === "timer") startPotatoTimer();
    playQuestionAudio();
  };

  if (wheelEnabled) {
    spinWheel(seg => {
      game.modifier = seg;
      applyModifierPre(seg,level);
      reveal();
    });
  } else {
    reveal();
  }
}

function renderQuestion() {
  const q = game.currentQuestion;
  $("questionText").textContent = q.question;
  $("answersGrid").innerHTML = "";

  q.options.forEach((option,index) => {
    const item = document.createElement("article");
    item.className = "answer";
    item.dataset.index = index;

    const letter = document.createElement("span");
    letter.className = "answer-letter";
    letter.textContent = LETTERS[index] + ":";

    const text = document.createElement("span");
    text.className = "answer-text";
    text.textContent = option;

    const lock = document.createElement("button");
    lock.className = "answer-lock-btn";
    lock.type = "button";
    lock.textContent = "Κλείδωσε";
    lock.addEventListener("click",() => lockAnswer(index));

    item.append(letter,text,lock);
    $("answersGrid").appendChild(item);
  });

  $("answersGrid").classList.toggle("is-blind",Boolean(game.blind));
  applyFiftyRemoval();
  updateModifierBanner();
}

function applyFiftyRemoval() {
  game.fiftyRemovedIndices.forEach(i => {
    const el = document.querySelector(`.answer[data-index="${i}"]`);
    if (el) el.classList.add("is-removed");
    const btn = el && el.querySelector(".answer-lock-btn");
    if (btn) btn.disabled = true;
  });
}

async function lockAnswer(index) {
  if (game.locked || game.resultResolved) return;

  stopPotatoTimer();
  game.locked = true;
  game.lockedAnswerIndex = index;

  document.querySelectorAll(".answer-lock-btn").forEach(btn => {
    btn.disabled = true;
    btn.classList.add("is-hidden-after-lock");
  });

  renderLifelines();

  const selected = document.querySelector(
    `.answer[data-index="${index}"]`
  );

  if (selected) {
    selected.classList.add("is-locked-answer");
  }

  const level = LEVELS[game.levelIndex];

  invalidateQuestionAudio();
  audioTransitioning = true;

  await fadeOutQuestionBed(1200);

  audioTransitioning = false;
  playExclusive("soundLock");

  lockTimer = setTimeout(() => {
    stopAudio($("soundLock"));

    if (currentAudio === $("soundLock")) {
      currentAudio = null;
    }

    resolveAnswer();
  }, level.lockMs);
}

function resolveAnswer() {
  const selectedIndex = game.lockedAnswerIndex;
  const correctIndex = game.currentQuestion.correct;
  const correct = selectedIndex === correctIndex;

  game.resultResolved = true;
  game.lastResult = correct ? "correct" : "wrong";

  const selected = document.querySelector(
    `.answer[data-index="${selectedIndex}"]`
  );

  const right = document.querySelector(
    `.answer[data-index="${correctIndex}"]`
  );

  if (selected) {
    selected.classList.remove("is-locked-answer");
    selected.classList.add(
      correct
        ? "is-result-correct"
        : "is-result-wrong"
    );
  }

  if (!correct && right) {
    right.classList.add("is-result-correct");
  }

  const level = LEVELS[game.levelIndex];

  stopPotatoTimer();
  $("answersGrid").classList.remove("is-blind");   // reveal options after answering

  if (correct) {
    game.correctCount += 1;
    game.wonAmount = level.amount;

    if (level.safe) {
      game.safeAmount = level.amount;
    }

    playExclusive("soundRight");
  } else {
    playExclusive("soundWrong");
  }

  applyModifierResolve(correct,level);
  updateBonusDisplay();
  renderBetResults(correct);

  $("continueWrap").classList.remove("hidden");
}

function continueGame() {
  if (!game.resultResolved) return;

  if (game.lastResult === "wrong") {
    game.pendingFinishPayout = game.safeAmount + game.bonus;
    showReady(false,true);
    return;
  }

  if (game.levelIndex === totalLevels() - 1) {
    game.pendingFinishPayout = game.wonAmount + game.bonus;
    showReady(false,true);
    return;
  }

  game.levelIndex += 1;
  showReady(false,false);
}

function handleStagePrimary() {
  if (game && game.pendingFinishPayout !== null) {
    const payout = game.pendingFinishPayout;
    game.pendingFinishPayout = null;
    finishGame(payout);
    return;
  }

  startNextQuestion();
}

/* Runs the audience-betting phase (if enabled) before showing the question. */
function startNextQuestion() {
  if (bettingEnabled && game.spectators && game.spectators.length) {
    openBettingPhase(showQuestion);
  } else {
    showQuestion();
  }
}

function openBettingPhase(cb) {
  const who = game.playerName || "ο παίκτης";
  const rows = game.spectators.map(n =>
    `<button class="bet-row yes" type="button" data-name="${escapeHtml(n)}" data-bet="yes">${escapeHtml(n)} — ✅ ΝΑΙ</button>`
  ).join("");

  openModal("🎲 Στοιχήματα κοινού",`
    <div class="bet-phase">
      <p class="bet-q">Θα τα καταφέρει <b>${escapeHtml(who)}</b>;</p>
      <p class="bet-hint">🤫 Μη μαρτυράτε την απάντηση! (πατήστε όποιον στοιχηματίζει «ΟΧΙ»)</p>
      <div class="bet-list">${rows}</div>
      <div class="form-actions">
        <button id="betProceed" class="primary-btn" type="button">Δείξε την ερώτηση</button>
      </div>
    </div>
  `);

  document.querySelectorAll(".bet-row").forEach(btn => {
    btn.addEventListener("click",() => {
      const yes = btn.dataset.bet === "yes";
      btn.dataset.bet = yes ? "no" : "yes";
      btn.textContent = `${btn.dataset.name} — ${yes ? "❌ ΟΧΙ" : "✅ ΝΑΙ"}`;
      btn.classList.toggle("yes",!yes);
      btn.classList.toggle("no",yes);
    });
  });

  $("betProceed").addEventListener("click",() => {
    game.bets = {};
    document.querySelectorAll(".bet-row").forEach(btn => {
      game.bets[btn.dataset.name] = btn.dataset.bet;
    });
    closeModal();
    cb();
  });
}

function renderBetResults(correct) {
  const el = $("betResults");
  if (!el) return;

  if (!bettingEnabled || !game.spectators || !game.spectators.length || !game.bets) {
    el.classList.add("hidden");
    return;
  }

  const winners = [];
  const losers = [];

  game.spectators.forEach(n => {
    const bet = game.bets[n];
    if (!bet) return;
    const won = (bet === "yes") === correct;
    if (won) {
      winners.push(n);
      game.betScores[n] = (game.betScores[n] || 0) + 1;
    } else {
      losers.push(n);
    }
  });

  let html = `<div class="bet-line ok">✅ Σωστή πρόβλεψη: ${winners.length ? winners.join(", ") : "—"}</div>`;

  if (losers.length) {
    const dare = MINI_DARES[Math.floor(Math.random() * MINI_DARES.length)];
    html += `<div class="bet-line bad">❌ Έχασαν: ${losers.join(", ")} → 😈 ${dare}</div>`;
  }

  el.innerHTML = html;
  el.classList.remove("hidden");
}

function snitchPunish() {
  const el = $("betResults");
  if (!el) return;
  const dare = MINI_DARES[Math.floor(Math.random() * MINI_DARES.length)];
  el.innerHTML = `<div class="bet-line bad">🗣️ Μαρτύρησε! Ποινή → 😈 ${dare}</div>`;
  el.classList.remove("hidden");
}

function stopGame() {
  invalidateQuestionAudio();
  audioTransitioning = false;
  stopQuestionBedHard();
  finishGame(game.wonAmount + game.bonus);
}

function finishGame(payout) {
  invalidateQuestionAudio();
  audioTransitioning = false;
  stopQuestionBedHard();
  clearTimers();
  game.finished = true;
  $("endTitle").textContent = formatAmount(payout);

  const bonusStat = game.bonus > 0
    ? `<div class="stat"><span>🎁 Μπόνους τροχού</span><strong>${formatAmount(game.bonus)}</strong></div>`
    : "";

  let betStat = "";
  const scores = game.betScores ? Object.entries(game.betScores) : [];
  if (scores.length) {
    scores.sort((a,b) => b[1] - a[1]);
    if (scores[0][1] > 0) {
      betStat = `<div class="stat"><span>🔮 Καλύτερος μάντης</span><strong>${scores[0][0]} (${scores[0][1]})</strong></div>`;
    }
  }

  $("statsGrid").innerHTML = `
    <div class="stat"><span>Κέρδος</span><strong>${formatAmount(payout)}</strong></div>
    <div class="stat"><span>Σωστές</span><strong>${game.correctCount}</strong></div>
    ${bonusStat}
    ${betStat}
  `;
  showScreen("end");
}

function showCorrectPeek() {
  if (!game || !game.currentQuestion || game.resultResolved) return;

  const index = game.currentQuestion.correct;
  const answer = document.querySelector(
    `.answer[data-index="${index}"]`
  );

  if (answer) {
    answer.classList.add("host-peek");
  }

  $("revealAnswerBtn").classList.add("is-peeking");
}

function hideCorrectPeek() {
  document.querySelectorAll(".answer.host-peek").forEach(el => {
    el.classList.remove("host-peek");
  });

  $("revealAnswerBtn").classList.remove("is-peeking");
}

function useFifty() {
  if (!canUseLifelines() || game.lifelines.fifty) return;

  game.lifelines.fifty = true;

  const wrong = [0,1,2,3]
    .filter(i => i !== game.currentQuestion.correct)
    .sort(() => Math.random() - .5);

  game.fiftyRemovedIndices = wrong.slice(0,2);

  applyFiftyRemoval();

  renderLifelines();
}

function usePhone() {
  if (!canUseLifelines() || game.lifelines.phone) return;

  game.lifelines.phone = true;
  renderLifelines();
}

function openModal(title,html) {
  $("modalTitle").textContent = title;
  $("modalBody").innerHTML = html;
  $("modalBackdrop").classList.remove("hidden");
}

function closeModal() {
  clearInterval(audienceTimer);
  audienceTimer = null;
  $("modalBackdrop").classList.add("hidden");
}

function makeAudienceTarget(active) {
  const q = game.currentQuestion;
  const correct = q.correct;
  const result = [0,0,0,0];

  let correctPct = active.length === 2
    ? 55 + Math.floor(Math.random()*26)
    : 38 + Math.floor(Math.random()*28);

  const others = active.filter(i => i !== correct);
  let remaining = 100 - correctPct;

  result[correct] = correctPct;

  others.forEach((idx,pos) => {
    if (pos === others.length - 1) {
      result[idx] = remaining;
    } else {
      const max = Math.max(1,remaining - (others.length-pos-1));
      const v = Math.floor(Math.random()*max);
      result[idx] = v;
      remaining -= v;
    }
  });

  const maxWrong = Math.max(...others.map(i => result[i]));
  if (maxWrong >= result[correct]) {
    const wi = others.find(i => result[i] === maxWrong);
    const shift = maxWrong - result[correct] + 1;
    result[wi] -= shift;
    result[correct] += shift;
  }

  return result;
}

function useAudience() {
  if (!canUseLifelines() || game.lifelines.audience) return;

  game.lifelines.audience = true;
  renderLifelines();

  const removed = new Set(game.fiftyRemovedIndices);
  const active = [0,1,2,3].filter(i => !removed.has(i));
  const target = makeAudienceTarget(active);
  const totalVotes = 1000;

  const counts = [0,0,0,0];
  const bag = [];

  active.forEach(i => {
    const n = Math.round(totalVotes * target[i] / 100);
    for (let x=0;x<n;x++) bag.push(i);
  });

  while (bag.length < totalVotes) bag.push(game.currentQuestion.correct);
  while (bag.length > totalVotes) bag.pop();

  for (let i=bag.length-1;i>0;i--) {
    const j = Math.floor(Math.random()*(i+1));
    [bag[i],bag[j]] = [bag[j],bag[i]];
  }

  const rows = active.map(i => `
    <div class="audience-row" data-index="${i}">
      <span>${LETTERS[i]}</span>
      <div class="audience-track"><div class="audience-fill"></div></div>
      <strong class="audience-live-value">0%</strong>
    </div>
  `).join("");

  openModal("Κοινό",`
    <div class="audience-live-head">
      <span>Ψήφοι</span>
      <strong id="voteCount">0 / 1.000</strong>
    </div>
    ${rows}
  `);

  let cast = 0;

  audienceTimer = setInterval(() => {
    const batch = Math.min(totalVotes-cast,15+Math.floor(Math.random()*18));

    for (let x=0;x<batch;x++) {
      counts[bag[cast]] += 1;
      cast += 1;
    }

    active.forEach(i => {
      const row = document.querySelector(`.audience-row[data-index="${i}"]`);
      const pct = cast ? counts[i] / cast * 100 : 0;
      row.querySelector(".audience-fill").style.width = pct.toFixed(1) + "%";
      row.querySelector(".audience-live-value").textContent = pct.toFixed(1) + "%";
    });

    $("voteCount").textContent = `${cast.toLocaleString("el-GR")} / 1.000`;

    if (cast >= totalVotes) {
      clearInterval(audienceTimer);
      audienceTimer = null;
    }
  },80);
}

async function useChange() {
  if (!canUseLifelines() || game.lifelines.change) return;
  if (game.mode === "custom") return;   // no pool to draw a replacement from

  audioTransitioning = true;
  invalidateQuestionAudio();

  document.querySelectorAll(".answer-lock-btn").forEach(btn => {
    btn.disabled = true;
  });

  renderLifelines();

  await fadeOutQuestionBed(1200);

  game.lifelines.change = true;
  game.currentQuestion = prepareQuestion(pickQuestion(game.levelIndex));

  game.fiftyRemovedIndices = [];
  game.locked = false;
  game.resultResolved = false;
  game.lockedAnswerIndex = null;

  resetQuestionUi();
  renderQuestion();

  audioTransitioning = false;
  renderLifelines();
  playQuestionAudio();
}

/* ---------- Admin mode (host tools) ---------- */

function updateAdminUI() {
  const toggle = $("adminToggle");
  if (toggle) toggle.classList.toggle("active",adminMode);

  const hasQuestion = Boolean(game && game.currentQuestion && !game.finished);
  const showSkip = adminMode && hasQuestion;
  const showSwap = adminMode && hasQuestion && game.mode !== "custom";

  const skip = $("adminSkipBtn");
  const swap = $("adminSwapBtn");
  if (skip) skip.classList.toggle("hidden",!showSkip);
  if (swap) swap.classList.toggle("hidden",!showSwap);
}

function toggleAdmin() {
  adminMode = !adminMode;
  updateAdminUI();
}

/* Free swap: replace the current question with another at the same level,
   no lifeline consumed. (Pool-based modes only.) */
function adminSwap() {
  if (!adminMode || !game || !game.currentQuestion || game.finished) return;
  if (game.mode === "custom") return;

  clearTimers();
  invalidateQuestionAudio();
  audioTransitioning = false;
  stopQuestionBedHard();

  game.currentQuestion = prepareQuestion(pickQuestion(game.levelIndex));
  game.fiftyRemovedIndices = [];
  game.locked = false;
  game.resultResolved = false;
  game.lockedAnswerIndex = null;

  resetQuestionUi();
  renderQuestion();
  renderLifelines();
  updateAdminUI();
  playQuestionAudio();
}

/* Skip: advance to the next money level without answering. */
function adminSkip() {
  if (!adminMode || !game || game.finished) return;

  clearTimers();
  invalidateQuestionAudio();
  audioTransitioning = false;
  stopQuestionBedHard();

  if (game.levelIndex < totalLevels() - 1) {
    game.levelIndex += 1;
    showQuestion();
  } else {
    finishGame(game.wonAmount);
  }
}

/* ---------- Wheel of Fortune ---------- */

let wheelRot = 0;
let wheelFinish = null;

function pickWheelSegment() {
  const total = WHEEL.reduce((a,s) => a + s.weight, 0);
  let r = Math.random() * total;
  for (const s of WHEEL) {
    if ((r -= s.weight) < 0) return s;
  }
  return WHEEL[0];
}

function buildWheelDOM() {
  const wheel = $("wheel");
  if (!wheel) return;
  const deg = 360 / WHEEL.length;
  const stops = WHEEL.map((s,i) => `${s.color} ${i*deg}deg ${(i+1)*deg}deg`).join(",");
  wheel.style.background = `conic-gradient(${stops})`;
}

function spinWheel(cb) {
  const seg = pickWheelSegment();
  const overlay = $("wheelOverlay");
  const wheel = $("wheel");
  const res = $("wheelResult");

  if (!overlay || !wheel) { cb(seg); return; }   // no DOM (e.g. tests) -> resolve instantly

  const deg = 360 / WHEEL.length;
  const idx = WHEEL.indexOf(seg);
  const align = (360 - (idx * deg + deg / 2)) % 360;
  const cur = ((wheelRot % 360) + 360) % 360;
  let delta = align - cur;
  if (delta < 0) delta += 360;
  wheelRot += 360 * 6 + delta;

  if (res) res.textContent = "";
  overlay.classList.remove("hidden");
  wheel.style.transition = "transform 1.6s cubic-bezier(.15,.85,.25,1)";
  void wheel.offsetWidth;
  wheel.style.transform = `rotate(${wheelRot}deg)`;

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    wheelFinish = null;
    if (res) res.textContent = `${seg.type === "reward" ? "🏆" : "😈"} ${seg.emoji} ${seg.name}`;
    setTimeout(() => {
      overlay.classList.add("hidden");
      cb(seg);
    }, 900);
  };

  wheelFinish = finish;
  wheel.addEventListener("transitionend",finish,{once:true});
  setTimeout(finish,2200);   // safety net if transitionend never fires
}

function applyModifierPre(seg,level) {
  if (!seg) return;

  if (seg.kind === "fifty") {
    const wrong = [0,1,2,3]
      .filter(i => i !== game.currentQuestion.correct)
      .sort(() => Math.random() - .5);
    game.fiftyRemovedIndices = wrong.slice(0,2);
  }

  if (seg.kind === "blind") {
    game.blind = true;
  }

  if (seg.kind === "lifeline") {
    const used = ["fifty","phone","audience","change"].find(k => game.lifelines[k]);
    if (used) game.lifelines[used] = false;
    else game.bonus += Math.round(level.amount * 0.5);   // all intact -> small cash instead
  }

  if (seg.kind === "safe") {
    game.safeAmount = Math.max(game.safeAmount,level.amount);
  }
}

function applyModifierResolve(correct) {
  const m = game.modifier;
  const b = $("modifierBanner");
  if (!m || !b) { if (b) b.classList.add("hidden"); return; }

  b.classList.remove("reward","punish");

  if (m.type === "reward") {
    if (correct) {
      b.textContent = `🏆 ΕΠΑΘΛΟ! ${m.text}`;
      b.classList.add("reward");
    } else {
      b.textContent = `😔 Έχασες το έπαθλο (${m.name}).`;
    }
  } else {
    if (!correct) {
      b.textContent = `😈 ΠΟΙΝΗ! ${m.text}`;
      b.classList.add("punish");
    } else {
      b.textContent = `😅 Τη γλίτωσες την ποινή! (${m.name})`;
      b.classList.add("reward");
    }
  }

  b.classList.remove("hidden");
}

function modifierDesc(m) {
  switch (m.id) {
    case "double":   return "Διπλά κέρδη αν το βρεις!";
    case "lucky":    return "Μικρό μπόνους αν το βρεις.";
    case "jackpot":  return "Τεράστιο μπόνους!";
    case "mega":     return "×5 μπόνους!";
    case "lifeline": return "Δώρο βοήθειας!";
    case "fifty":    return "Έφυγαν 2 λάθος, δωρεάν.";
    case "safe":     return "Αυτό το σκαλί είναι ασφαλές.";
    case "gamble":   return "Σωστό → διπλό πουγκί · Λάθος → το χάνεις!";
    case "blind":    return "Δεν βλέπεις τις επιλογές — μεγάλο μπόνους!";
    case "timer":    return "20 δευτ.! Διπλό μπόνους αν προλάβεις.";
    default:         return "";
  }
}

function updateModifierBanner() {
  const b = $("modifierBanner");
  if (!b) return;
  const m = game && game.modifier;
  b.classList.remove("reward","punish");
  if (!m) { b.classList.add("hidden"); return; }

  if (m.type === "reward") {
    b.textContent = `${m.emoji} Έπαθλο αν το βρεις: ${m.text}`;
    b.classList.add("reward");
  } else {
    b.textContent = `${m.emoji} Ποινή αν το χάσεις: ${m.text}`;
    b.classList.add("punish");
  }
  b.classList.remove("hidden");
}

function updateBonusDisplay() {
  const el = $("bonusDisplay");
  if (!el) return;
  if (game && game.bonus > 0) {
    el.textContent = `🎁 +${formatAmount(game.bonus)}`;
    el.classList.remove("hidden");
  } else {
    el.classList.add("hidden");
  }
}

function startPotatoTimer() {
  const el = $("qTimer");
  let t = 20;
  if (el) { el.textContent = `⏱️ ${t}″`; el.classList.remove("hidden"); }
  modTimer = setInterval(() => {
    t -= 1;
    if (el) el.textContent = `⏱️ ${t}″`;
    if (t <= 0) {
      clearInterval(modTimer);
      modTimer = null;
      potatoTimeout();
    }
  },1000);
}

function stopPotatoTimer() {
  if (modTimer !== null) { clearInterval(modTimer); modTimer = null; }
  const el = $("qTimer");
  if (el) el.classList.add("hidden");
}

function potatoTimeout() {
  const el = $("qTimer");
  if (el) el.classList.add("hidden");
  if (!game || game.locked || game.resultResolved) return;
  game.locked = true;
  game.lockedAnswerIndex = -1;   // ran out of time -> wrong
  document.querySelectorAll(".answer-lock-btn").forEach(b => b.disabled = true);
  resolveAnswer();
}

/* ---------- Category chips (start screen) ---------- */

function renderCategoryChips() {
  const wrap = $("categoryChips");
  if (!wrap) return;

  wrap.innerHTML = "";

  CATEGORIES.forEach(cat => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "category-chip";
    btn.textContent = cat.label;
    btn.dataset.key = cat.key;
    btn.setAttribute("aria-pressed",selectedCategories.has(cat.key) ? "true" : "false");
    btn.classList.toggle("selected",selectedCategories.has(cat.key));

    btn.addEventListener("click",() => {
      if (selectedCategories.has(cat.key)) {
        selectedCategories.delete(cat.key);
      } else {
        selectedCategories.add(cat.key);
      }

      const on = selectedCategories.has(cat.key);
      btn.classList.toggle("selected",on);
      btn.setAttribute("aria-pressed",on ? "true" : "false");
    });

    wrap.appendChild(btn);
  });
}

/* ---------- Small form helpers ---------- */

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g,c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[c]));
}

function setMsg(el,text,ok) {
  if (!el) return false;
  el.textContent = text;
  el.className = "form-msg " + (ok ? "ok" : "err");
  return ok;
}

function optionRowsHtml() {
  return [0,1,2,3].map(i => `
    <div class="opt-row">
      <input type="radio" name="correct" value="${i}"${i === 0 ? " checked" : ""} aria-label="Σωστή: ${LETTERS[i]}">
      <span class="opt-letter">${LETTERS[i]}</span>
      <input type="text" name="opt${i}" maxlength="120" placeholder="Επιλογή ${LETTERS[i]}">
    </div>`).join("");
}

function readQuestionForm(form) {
  const question = form.question.value.trim();
  const options = [0,1,2,3].map(i => form["opt" + i].value.trim());
  const correct = Number(form.correct.value);
  return {question,options,correct};
}

function validateQuestionForm(data,msg) {
  if (!data.question) return setMsg(msg,"Γράψε την ερώτηση.",false);
  if (data.options.some(o => !o)) return setMsg(msg,"Συμπλήρωσε και τις 4 επιλογές.",false);
  if (new Set(data.options).size !== 4) return setMsg(msg,"Οι 4 επιλογές πρέπει να είναι διαφορετικές.",false);
  return true;
}

/* ---------- Add question to the pool ---------- */

function openAddQuestionModal() {
  const priceOptions = PRICE_BANDS
    .map(b => `<option value="${b.value}">${escapeHtml(b.label)}</option>`)
    .join("");

  const categoryOptions = CATEGORIES
    .map(c => `<option value="${c.key}">${escapeHtml(c.label)}</option>`)
    .join("");

  openModal("Προσθήκη ερώτησης",`
    <form id="addQForm" class="q-form" autocomplete="off">
      <label>Εύρος ποσού
        <select name="difficulty">${priceOptions}</select>
      </label>
      <label>Κατηγορία
        <select name="category">${categoryOptions}</select>
      </label>
      <label>Ερώτηση
        <input type="text" name="question" maxlength="200" placeholder="Γράψε την ερώτηση">
      </label>
      <fieldset class="q-options">
        <legend>Επιλογές & σωστή απάντηση</legend>
        ${optionRowsHtml()}
        <p class="opt-hint">Επίλεξε το κουμπί δίπλα στη σωστή απάντηση.</p>
      </fieldset>
      <p class="form-msg" id="addQMsg"></p>
      <div class="form-actions">
        <button type="submit" class="primary-btn">Αποθήκευση στο πακέτο</button>
      </div>
    </form>
  `);

  $("addQForm").addEventListener("submit",handleAddQuestionSubmit);
}

function handleAddQuestionSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const msg = $("addQMsg");
  const data = readQuestionForm(form);

  if (!validateQuestionForm(data,msg)) return;

  const category = form.category.value;
  const cat = CATEGORIES.find(c => c.key === category);

  userQuestions.push({
    id:"user-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
    category,
    categoryLabel:cat ? cat.label : "Δικές μου",
    difficulty:Number(form.difficulty.value),
    question:data.question,
    options:data.options,
    correct:data.correct,
    trivia:"Ερώτηση που πρόσθεσε ο παρουσιαστής.",
    source:"Προστέθηκε από τον χρήστη",
    user:true
  });

  saveUserQuestions(userQuestions);
  rebuildAllQuestions();

  form.reset();
  form.correct.value = "0";
  setMsg(msg,"Αποθηκεύτηκε! Πρόσθεσε κι άλλη ή κλείσε.",true);
}

/* ---------- Custom session builder ---------- */

function loadCustomDraft() {
  try {
    const arr = JSON.parse(localStorage.getItem(CUSTOM_DRAFT_KEY));
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveCustomDraft() {
  localStorage.setItem(CUSTOM_DRAFT_KEY,JSON.stringify(customDraft));
}

let customDraft = loadCustomDraft();

function renderCustomList() {
  const list = $("customList");
  if (!list) return;

  list.innerHTML = "";

  customDraft.forEach((q,index) => {
    const li = document.createElement("li");
    li.className = "custom-item";

    const idx = document.createElement("span");
    idx.className = "idx";
    idx.textContent = (index + 1) + ".";

    const txt = document.createElement("span");
    txt.className = "txt";
    txt.textContent = q.question;

    const rm = document.createElement("button");
    rm.type = "button";
    rm.className = "remove-btn";
    rm.textContent = "×";
    rm.setAttribute("aria-label","Αφαίρεση");
    rm.addEventListener("click",() => {
      customDraft.splice(index,1);
      saveCustomDraft();
      renderCustomList();
    });

    li.append(idx,txt,rm);
    list.appendChild(li);
  });
}

function openCustomSessionModal() {
  openModal("Δική σου παρτίδα",`
    <div class="modal-body-scroll">
      <p class="custom-intro">Φτιάξε τη δική σου παρτίδα (έως ${LEVELS.length} ερωτήσεις). Παίζονται με τη σειρά, ανεβαίνοντας τη σκάλα των χρημάτων.</p>
      <ol id="customList" class="custom-list"></ol>
      <hr class="builder-divider">
      <form id="customQForm" class="q-form" autocomplete="off">
        <label>Ερώτηση
          <input type="text" name="question" maxlength="200" placeholder="Γράψε την ερώτηση">
        </label>
        <fieldset class="q-options">
          <legend>Επιλογές & σωστή απάντηση</legend>
          ${optionRowsHtml()}
        </fieldset>
        <p class="form-msg" id="customMsg"></p>
        <div class="form-actions">
          <button type="submit" class="ghost-btn">Προσθήκη ερώτησης</button>
        </div>
      </form>
      <hr class="builder-divider">
      <div class="form-actions">
        <button id="clearCustomBtn" type="button" class="ghost-btn">Καθαρισμός</button>
        <button id="playCustomBtn" type="button" class="primary-btn">Παίξε την παρτίδα</button>
      </div>
    </div>
  `);

  renderCustomList();

  $("customQForm").addEventListener("submit",handleCustomAdd);
  $("clearCustomBtn").addEventListener("click",() => {
    customDraft = [];
    saveCustomDraft();
    renderCustomList();
    setMsg($("customMsg"),"Η λίστα καθαρίστηκε.",true);
  });
  $("playCustomBtn").addEventListener("click",playCustomSession);
}

function handleCustomAdd(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const msg = $("customMsg");

  if (customDraft.length >= LEVELS.length) {
    setMsg(msg,`Έφτασες το όριο των ${LEVELS.length} ερωτήσεων.`,false);
    return;
  }

  const data = readQuestionForm(form);
  if (!validateQuestionForm(data,msg)) return;

  customDraft.push(data);
  saveCustomDraft();

  form.reset();
  form.correct.value = "0";
  renderCustomList();
  setMsg(msg,`Προστέθηκε (${customDraft.length}/${LEVELS.length}).`,true);
}

function playCustomSession() {
  const msg = $("customMsg");

  if (!customDraft.length) {
    setMsg(msg,"Πρόσθεσε τουλάχιστον μία ερώτηση.",false);
    return;
  }

  const queue = customDraft.slice(0,LEVELS.length).map((q,i) => ({
    id:"custom-" + i,
    category:"custom",
    categoryLabel:"Δική σου παρτίδα",
    difficulty:0,
    question:q.question,
    options:q.options.slice(),
    correct:q.correct,
    trivia:"Ερώτηση από τη δική σου παρτίδα.",
    source:""
  }));

  closeModal();
  startCustomGame(queue);
}

$("startBtn").addEventListener("click",startGame);
$("addQuestionBtn").addEventListener("click",openAddQuestionModal);
$("customSessionBtn").addEventListener("click",openCustomSessionModal);
$("adminToggle").addEventListener("click",toggleAdmin);
$("adminSkipBtn").addEventListener("click",adminSkip);
$("adminSwapBtn").addEventListener("click",adminSwap);

$("wheelToggle").addEventListener("click",() => {
  wheelEnabled = !wheelEnabled;
  const b = $("wheelToggle");
  b.classList.toggle("active",wheelEnabled);
  b.textContent = `🎡 Τροχός της Τύχης: ${wheelEnabled ? "ΟΝ" : "OFF"}`;
});

$("wheelOverlay").addEventListener("click",() => {
  if (typeof wheelFinish === "function") wheelFinish();   // click to skip the spin
});

$("betToggle").addEventListener("click",() => {
  bettingEnabled = !bettingEnabled;
  const b = $("betToggle");
  b.classList.toggle("active",bettingEnabled);
  b.textContent = `👀 Στοιχήματα κοινού: ${bettingEnabled ? "ΟΝ" : "OFF"}`;
});

$("snitchBtn").addEventListener("click",snitchPunish);
$("showQuestionBtn").addEventListener("click",handleStagePrimary);
$("stopGameBtn").addEventListener("click",stopGame);
$("continueBtn").addEventListener("click",continueGame);
$("revealAnswerBtn").addEventListener("mouseenter",showCorrectPeek);
$("revealAnswerBtn").addEventListener("mouseleave",hideCorrectPeek);
$("revealAnswerBtn").addEventListener("pointerdown",showCorrectPeek);
$("revealAnswerBtn").addEventListener("pointerup",hideCorrectPeek);
$("revealAnswerBtn").addEventListener("pointercancel",hideCorrectPeek);





$("lifelines").addEventListener("click",event => {
  const btn = event.target.closest(".lifeline-btn");

  if (!btn || !$("lifelines").contains(btn) || btn.disabled) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  const actions = {
    fifty:useFifty,
    phone:usePhone,
    audience:useAudience,
    change:useChange
  };

  const action = actions[btn.dataset.lifeline];

  if (action) {
    action();
  }
});

$("modalCloseBtn").addEventListener("click",closeModal);
$("modalBackdrop").addEventListener("click",e => {
  if (e.target === $("modalBackdrop")) closeModal();
});
$("newGameBtn").addEventListener("click",() => {
  clearTimers();
  invalidateQuestionAudio();
  audioTransitioning = false;
  stopQuestionBedHard();
  if (currentAudio) stopAudio(currentAudio);
  game = null;
  showScreen("setup");
});

renderCategoryChips();
buildWheelDOM();

