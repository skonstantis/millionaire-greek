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

const BASE_QUESTIONS = normalizeBank();
let userQuestions = loadUserQuestions();
let allQuestions = BASE_QUESTIONS.concat(userQuestions);

function rebuildAllQuestions() {
  allQuestions = BASE_QUESTIONS.concat(userQuestions);
}

let selectedCategories = new Set();   // empty = all categories


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

  const inFilter = allQuestions.filter(q => questionMatchesFilter(q,cats));
  const base = inFilter.length ? inFilter : allQuestions;

  const tiers = [
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

  if (selected) used.add(selected.id);

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
    customQueue:null,
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

  const level = LEVELS[game.levelIndex];
  const raw = game.mode === "custom"
    ? game.customQueue[game.levelIndex]
    : pickQuestion(game.levelIndex);
  game.currentQuestion = prepareQuestion(raw);

  $("preQuestionStage").classList.add("hidden");
  $("questionStage").classList.remove("hidden");
  $("questionCounter").textContent = `${game.levelIndex + 1}/${totalLevels()}`;
  $("amountDisplay").textContent = formatAmount(level.amount);

  renderQuestion();
  renderLifelines();
  playQuestionAudio();
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
}

async function lockAnswer(index) {
  if (game.locked || game.resultResolved) return;

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

  $("continueWrap").classList.remove("hidden");
}

function continueGame() {
  if (!game.resultResolved) return;

  if (game.lastResult === "wrong") {
    game.pendingFinishPayout = game.safeAmount;
    showReady(false,true);
    return;
  }

  if (game.levelIndex === totalLevels() - 1) {
    game.pendingFinishPayout = game.wonAmount;
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

  showQuestion();
}

function stopGame() {
  invalidateQuestionAudio();
  audioTransitioning = false;
  stopQuestionBedHard();
  finishGame(game.wonAmount);
}

function finishGame(payout) {
  invalidateQuestionAudio();
  audioTransitioning = false;
  stopQuestionBedHard();
  game.finished = true;
  $("endTitle").textContent = formatAmount(payout);
  $("statsGrid").innerHTML = `
    <div class="stat"><span>Κέρδος</span><strong>${formatAmount(payout)}</strong></div>
    <div class="stat"><span>Σωστές</span><strong>${game.correctCount}</strong></div>
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

  game.fiftyRemovedIndices.forEach(i => {
    const el = document.querySelector(`.answer[data-index="${i}"]`);
    if (el) el.classList.add("is-removed");
    const btn = el?.querySelector(".answer-lock-btn");
    if (btn) btn.disabled = true;
  });

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

