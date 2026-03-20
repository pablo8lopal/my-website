// === App Config and State ===
const QUESTIONS_PER_QUIZ = 10;
const STORAGE_KEYS = {
    scoreboard: "ge_trivia_scoreboard",
    deviceLock: "ge_trivia_device_submitted"
};
const ADMIN_PASSCODE = "GE-ADMIN-2026";

// Toggle this in structure.html by changing: <body data-single-attempt="false">
const SINGLE_ATTEMPT_MODE = document.body.dataset.singleAttempt === "true";

let questions = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let playerName = "";

// === DOM References ===
const entryPanel = document.getElementById("entry-panel");
const quizPanel = document.getElementById("quiz-panel");
const scoreboardPanel = document.getElementById("scoreboard-panel");

const playerNameInput = document.getElementById("player-name");
const entryMessage = document.getElementById("entry-message");
const adminPasscodeInput = document.getElementById("admin-passcode");
const adminMessage = document.getElementById("admin-message");
const adminClearLockButton = document.getElementById("admin-clear-lock");
const adminClearScoreboardButton = document.getElementById("admin-clear-scoreboard");
const adminClearAllButton = document.getElementById("admin-clear-all");

const startQuizButton = document.getElementById("start-quiz-button");
const viewScoreboardEntryButton = document.getElementById("view-scoreboard-entry-button");
const viewScoreboardButton = document.getElementById("view-scoreboard-button");
const backToEntryButton = document.getElementById("back-to-entry-button");

const questionElement = document.getElementById("question");
const questionCounter = document.getElementById("question-counter");
const answersElement = document.getElementById("answers");
const feedbackElement = document.getElementById("feedback");
const restartButton = document.getElementById("restart-button");
const progressFill = document.getElementById("progress");
const scoreboardList = document.getElementById("scoreboard-list");

// === Question Banks ===
const existingQuestions = [
        { question: "What year was GE Aerospace founded?", answers: ["1905", "1917", "1932", "1945"], correct: 1 },
        { question: "What is GE Aerospace's primary focus?", answers: ["Aircraft interiors", "Jet engines", "Navigation systems", "Satellites"], correct: 1 },
        { question: "What is the name of GE Aerospace's lean operating model?", answers: ["SkyDeck", "AeroLean", "FLIGHT DECK", "JetStream"], correct: 2 },
        { question: "Which GE Aerospace engine powers the Boeing 777?", answers: ["CF6", "GE90", "LEAP", "GE9X"], correct: 1 },
        { question: "What is the world's most powerful jet engine?", answers: ["GE90", "LEAP", "GE9X", "CF34"], correct: 2 },
        { question: "What is GE Aerospace's commitment to sustainability?", answers: ["Supersonic aircraft", "Sustainable aviation technologies", "Space exploration engines", "Electric cars"], correct: 1 },
        { question: "Which engine is used in military applications like the F/A-18 Hornet?", answers: ["GE90", "F404", "CF34", "LEAP"], correct: 1 },
        { question: "What is GE Aerospace's digital platform for engine monitoring?", answers: ["TrueEngine", "AeroTrack", "JetMonitor", "EngineView"], correct: 0 },
        { question: "What is the significance of the LEAP engine?", answers: ["Most powerful jet engine", "Fuel efficiency and reduced emissions", "Exclusively for military aircraft", "First electric jet engine"], correct: 1 },
        { question: "What are GE Aerospace's priorities in order?", answers: ["Cost, Delivery, Quality, Safety", "Quality, Safety, Delivery, Cost", "Safety, Quality, Delivery, Cost", "Delivery, Cost, Safety, Quality"], correct: 2 },
        { question: "Which GE Aerospace engine powers the Boeing 787 Dreamliner?", answers: ["GE90", "GEnx", "CF34", "LEAP"], correct: 1 },
        { question: "What is the name of GE Aerospace's hybrid-electric propulsion program?", answers: ["SkyCharge", "HybridFlight", "Catalyst", "GE Electric"], correct: 2 },
        { question: "Which GE Aerospace engine is used in regional jets?", answers: ["CF34", "GE90", "LEAP", "GE9X"], correct: 0 },
        { question: "What is GE Aerospace's approach to lean manufacturing?", answers: ["Kaizen", "Six Sigma", "FLIGHT DECK", "Hoshin Kanri"], correct: 2 },
        { question: "Which engine powers the Boeing 737 MAX?", answers: ["CF6", "GE90", "LEAP", "GEnx"], correct: 2 },
        { question: "What is the name of GE Aerospace's advanced materials program?", answers: ["Ceramic Matrix Composites", "Carbon Fiber Composites", "Metallic Alloys", "NanoMaterials"], correct: 0 },
        { question: "Which GE Aerospace engine is used in business jets?", answers: ["CF34", "Passport", "GE90", "LEAP"], correct: 1 },
        { question: "What is GE Aerospace's focus for future aviation?", answers: ["Supersonic jets", "Sustainable aviation fuels", "Space exploration", "Electric cars"], correct: 1 },
        { question: "Which engine powers the Airbus A320neo?", answers: ["CF6", "GE90", "LEAP", "GEnx"], correct: 2 },
        { question: "What is the name of GE Aerospace's additive manufacturing program?", answers: ["AdditiveWorks", "GE Additive", "3D Aero", "MetalPrint"], correct: 1 },
        { question: "What is the primary focus of GE Aerospace's Munich site?", answers: ["Jet engine manufacturing", "Research and development", "Aircraft interiors", "Navigation systems"], correct: 1 },
        { question: "Which advanced technology is developed at GE Aerospace's Munich site?", answers: ["Ceramic Matrix Composites", "Hybrid-electric propulsion", "Supersonic engines", "Space exploration engines"], correct: 1 },
        { question: "What is the name of the GE Aerospace Munich site?", answers: ["GE Aviation Munich", "GE Aerospace Research Center", "GE Aerospace Advanced Technology Center", "GE Munich Innovation Hub"], correct: 2 },
        { question: "In which country is GE Aerospace's Munich site located?", answers: ["Germany", "Austria", "Switzerland", "France"], correct: 0 },
        { question: "What type of collaboration is GE Aerospace's Munich site known for?", answers: ["University partnerships", "Military contracts", "Commercial engine production", "Space exploration"], correct: 0 },
        { question: "Which propulsion system is being researched at GE Aerospace Munich?", answers: ["Hybrid-electric propulsion", "Supersonic propulsion", "Nuclear propulsion", "Hydrogen propulsion"], correct: 0 },
        { question: "What is a key sustainability focus at GE Aerospace Munich?", answers: ["Sustainable aviation fuels", "Electric aircraft", "Carbon-neutral manufacturing", "Space exploration"], correct: 0 },
        { question: "How does GE Aerospace Munich contribute to GE's global operations?", answers: ["By manufacturing jet engines", "By conducting advanced research", "By producing navigation systems", "By building satellites"], correct: 1 },
        { question: "What is the role of GE Aerospace Munich in hybrid-electric propulsion?", answers: ["Testing", "Research and development", "Manufacturing", "Marketing"], correct: 1 },
        { question: "Which European city is home to GE Aerospace's advanced technology center?", answers: ["Berlin", "Munich", "Frankfurt", "Hamburg"], correct: 1 },
        { question: "What is GE Aerospace's approach to sustainability?", answers: ["Supersonic jets", "Sustainable aviation fuels", "Space exploration", "Electric cars"], correct: 1 },
        { question: "Which GE Aerospace engine powers the Boeing 747?", answers: ["CF6", "GE90", "LEAP", "GEnx"], correct: 0 },
        { question: "What is the name of GE Aerospace's digital analytics platform?", answers: ["TrueEngine", "AeroTrack", "JetMonitor", "EngineView"], correct: 0 },
        { question: "Which GE Aerospace engine is used in the F-16 fighter jet?", answers: ["F404", "F110", "CF34", "GE90"], correct: 1 },
        { question: "What is GE Aerospace's focus for future propulsion systems?", answers: ["Hybrid-electric propulsion", "Supersonic propulsion", "Nuclear propulsion", "Hydrogen propulsion"], correct: 0 },
        { question: "Which GE Aerospace engine powers the Boeing 777X?", answers: ["GE90", "GE9X", "LEAP", "CF6"], correct: 1 },
        { question: "What is the name of GE Aerospace's sustainability initiative?", answers: ["GE Green Aviation", "GE Sustainable Flight", "GE Aviation Sustainability", "GE Aerospace EcoFlight"], correct: 1 },
        { question: "Which GE Aerospace engine is used in the Embraer E-Jet series?", answers: ["CF34", "Passport", "GE90", "LEAP"], correct: 0 },
        { question: "What is GE Aerospace's focus for additive manufacturing?", answers: ["Ceramic Matrix Composites", "3D printing", "Carbon Fiber Composites", "NanoMaterials"], correct: 1 },
        { question: "Which GE Aerospace engine powers the Airbus A350?", answers: ["GE90", "GEnx", "LEAP", "CF6"], correct: 1 },
        { question: "How many employees does GE Aerospace have globally?", answers: ["10,000", "25,000", "40,000", "50,000"], correct: 2 },
        { question: "In which country is GE Aerospace's headquarters located?", answers: ["Germany", "United States", "France", "United Kingdom"], correct: 1 },
        { question: "Which city is home to GE Aerospace's headquarters?", answers: ["Cincinnati", "Munich", "Paris", "Boston"], correct: 0 },
        { question: "How many GE Aerospace sites are there worldwide?", answers: ["50", "75", "100", "125"], correct: 2 },
        { question: "Which of the following is NOT a GE Aerospace site?", answers: ["Munich", "Evendale", "Bangalore", "Seattle"], correct: 3 },
        { question: "What is the primary focus of GE Aerospace's Bangalore site?", answers: ["Manufacturing", "Research and development", "Engine testing", "Marketing"], correct: 1 },
        { question: "Which GE Aerospace site specializes in additive manufacturing?", answers: ["Munich", "Evendale", "Bangalore", "West Chester"], correct: 1 },
        { question: "In which continent does GE Aerospace have the most sites?", answers: ["North America", "Europe", "Asia", "South America"], correct: 0 },
        { question: "Which GE Aerospace site is known for its work on hybrid-electric propulsion?", answers: ["Munich", "Bangalore", "Evendale", "Lynn"], correct: 0 },
        { question: "What is the role of GE Aerospace's Lynn site?", answers: ["Military engine production", "Commercial engine production", "Research and development", "Additive manufacturing"], correct: 0 },
        { question: "Which of the following engines is NOT produced by GE Aerospace?", answers: ["GE90", "LEAP", "PW1000G", "GEnx"], correct: 2 },
        { question: "Which of the following engines is produced by CFM International?", answers: ["GE90", "LEAP", "CF6", "GEnx"], correct: 1 },
        { question: "What does CFM stand for in CFM International?", answers: ["Commercial Flight Motors", "Collaborative Flight Manufacturing", "Customer Focused Manufacturing", "Nothing (it's a combination of GE and Safran names)"], correct: 3 },
        { question: "Which engine powers the Boeing 737 MAX?", answers: ["CF6", "GE90", "LEAP", "GEnx"], correct: 2 },
        { question: "Which engine powers the Airbus A320neo?", answers: ["CF6", "GE90", "LEAP", "PW1000G"], correct: 2 },
        { question: "Which engine powers the Boeing 777X?", answers: ["GE90", "GE9X", "LEAP", "CF6"], correct: 1 },
        { question: "Which engine powers the Boeing 747?", answers: ["CF6", "GE90", "LEAP", "GEnx"], correct: 0 },
        { question: "Which engine powers the Boeing 787 Dreamliner?", answers: ["GE90", "GEnx", "CF34", "LEAP"], correct: 1 },
        { question: "Which engine powers the Embraer E-Jet series?", answers: ["CF34", "Passport", "GE90", "LEAP"], correct: 0 },
        { question: "Which engine powers the Bombardier Global 7500 business jet?", answers: ["CF34", "Passport", "GE90", "LEAP"], correct: 1 },
        { question: "In what year did the GE90 engine enter service?", answers: ["1990", "1995", "2000", "2005"], correct: 1 },
        { question: "In what year did the GEnx engine enter service?", answers: ["2005", "2007", "2010", "2012"], correct: 2 },
        { question: "In what year did the LEAP engine enter service?", answers: ["2014", "2016", "2018", "2020"], correct: 1 },
        { question: "In what year did the CF6 engine enter service?", answers: ["1965", "1970", "1975", "1980"], correct: 1 },
        { question: "In what year did the Passport engine enter service?", answers: ["2015", "2016", "2017", "2018"], correct: 1 },
        { question: "In what year did the GE9X engine enter service?", answers: ["2018", "2019", "2020", "2021"], correct: 2 },
        { question: "Which GE Aerospace engine was the first to use ceramic matrix composites (CMCs)?", answers: ["GE90", "GEnx", "LEAP", "GE9X"], correct: 2 },
        { question: "Which GE Aerospace engine was the first to use additive manufacturing for production parts?", answers: ["GE90", "GEnx", "LEAP", "GE9X"], correct: 2 },
        { question: "Which GE Aerospace engine was the first to exceed 100,000 pounds of thrust?", answers: ["GE90", "GEnx", "LEAP", "GE9X"], correct: 0 },
        { question: "Which GE Aerospace engine is the most fuel-efficient in its class?", answers: ["GE90", "GEnx", "LEAP", "GE9X"], correct: 2 },
        { question: "Which plane is powered by the GE90 engine?", answers: ["Boeing 747", "Boeing 777", "Boeing 787", "Airbus A320neo"], correct: 1 },
        { question: "Which plane is powered by the GEnx engine?", answers: ["Boeing 747-8", "Boeing 777", "Boeing 787", "Airbus A350"], correct: 0 },
        { question: "Which plane is powered by the CF6 engine?", answers: ["Boeing 747", "Boeing 737 MAX", "Airbus A320neo", "Bombardier Global 7500"], correct: 0 },
        { question: "Which plane is powered by the LEAP engine?", answers: ["Boeing 737 MAX", "Airbus A320neo", "Boeing 777X", "Boeing 787"], correct: 0 },
        { question: "Which plane is powered by the Passport engine?", answers: ["Bombardier Global 7500", "Embraer E-Jet", "Boeing 747", "Airbus A320neo"], correct: 0 },
        { question: "Which plane is powered by the GE9X engine?", answers: ["Boeing 777X", "Boeing 787", "Airbus A350", "Boeing 747-8"], correct: 0 },
        { question: "Which plane is powered by the CF34 engine?", answers: ["Embraer E-Jet", "Bombardier Global 7500", "Boeing 737 MAX", "Airbus A320neo"], correct: 0 },
        { question: "Which plane is powered by the GEnx engine?", answers: ["Boeing 787", "Boeing 777", "Airbus A320neo", "Boeing 747-8"], correct: 0 },
        { question: "Which plane is powered by the LEAP engine?", answers: ["Airbus A320neo", "Boeing 737 MAX", "Boeing 777X", "Boeing 747"], correct: 0 },
        { question: "Which plane is powered by the GE90 engine?", answers: ["Boeing 777", "Boeing 787", "Airbus A350", "Boeing 747-8"], correct: 0 }
];

const riseQuestions = [
        {
            question: "What does RISE stand for in GE Aerospace's RISE program?",
            answers: [
                "Revolutionary Innovation for Sustainable Engines",
                "Research in Sustainable Energy",
                "Revolutionary Integrated Sustainable Engines",
                "Renewable Innovation for Sustainable Engines"
            ],
            correct: 0
        },
        {
            question: "What is the primary goal of the RISE program?",
            answers: [
                "To develop supersonic engines",
                "To create hybrid-electric propulsion systems",
                "To reduce fuel consumption and emissions",
                "To manufacture military engines"
            ],
            correct: 2
        },
        {
            question: "By what year does GE Aerospace aim to introduce the RISE engine into service?",
            answers: ["2030", "2035", "2040", "2045"],
            correct: 1
        },
        {
            question: "What type of propulsion system is being developed under the RISE program?",
            answers: [
                "Hybrid-electric propulsion",
                "Hydrogen propulsion",
                "Nuclear propulsion",
                "Supersonic propulsion"
            ],
            correct: 0
        },
        {
            question: "How much fuel efficiency improvement is targeted by the RISE program compared to current engines?",
            answers: ["10%", "20%", "30%", "50%"],
            correct: 1
        },
        {
            question: "What is the expected reduction in CO2 emissions from the RISE engine?",
            answers: ["10%", "20%", "30%", "50%"],
            correct: 1
        },
        {
            question: "Which type of aircraft is the RISE engine primarily designed for?",
            answers: [
                "Narrow-body aircraft",
                "Wide-body aircraft",
                "Military aircraft",
                "Business jets"
            ],
            correct: 0
        },
        {
            question: "What advanced technology is being used in the RISE program to improve engine efficiency?",
            answers: [
                "Ceramic Matrix Composites (CMCs)",
                "Carbon Fiber Composites",
                "Metallic Alloys",
                "NanoMaterials"
            ],
            correct: 0
        },
        {
            question: "What is the name of the open-fan architecture being developed under the RISE program?",
            answers: [
                "UltraFan",
                "Open Rotor",
                "Advanced Open Fan",
                "HybridFan"
            ],
            correct: 1
        },
        {
            question: "Which company is GE Aerospace collaborating with on the RISE program?",
            answers: [
                "Rolls-Royce",
                "Safran Aircraft Engines",
                "Pratt & Whitney",
                "Boeing"
            ],
            correct: 1
        },
        {
            question: "What type of fuel is the RISE engine designed to operate with?",
            answers: [
                "Jet-A fuel",
                "Sustainable Aviation Fuel (SAF)",
                "Hydrogen",
                "Biofuel"
            ],
            correct: 1
        },
        {
            question: "How does the open-fan architecture in the RISE program improve efficiency?",
            answers: [
                "By reducing noise",
                "By increasing thrust",
                "By reducing drag",
                "By bypassing more air around the engine core"
            ],
            correct: 3
        },
        {
            question: "What is the expected noise reduction from the RISE engine compared to current engines?",
            answers: ["10%", "20%", "30%", "50%"],
            correct: 1
        },
        {
            question: "What is a key sustainability focus of the RISE program?",
            answers: [
                "Carbon-neutral manufacturing",
                "Electric aircraft",
                "Hydrogen propulsion",
                "Sustainable aviation fuels"
            ],
            correct: 3
        },
        {
            question: "What is the role of hybrid-electric propulsion in the RISE program?",
            answers: [
                "To reduce noise",
                "To improve fuel efficiency",
                "To increase thrust",
                "To enable supersonic flight"
            ],
            correct: 1
        }
];

// === Pool Builder ===
function buildQuestionPool() {
    const all = [...existingQuestions, ...riseQuestions];
    const seen = new Set();
    return all.filter((item) => {
        const key = item.question.trim().toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

function pickRandomQuestions(count = QUESTIONS_PER_QUIZ) {
    const pool = buildQuestionPool();
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, Math.min(count, pool.length));
}

function getScoreboard() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.scoreboard)) || [];
}

function saveScoreboard(items) {
    localStorage.setItem(STORAGE_KEYS.scoreboard, JSON.stringify(items));
}

function saveResult(name, score, total) {
    const rows = getScoreboard();
    rows.push({
        name,
        score,
        total,
        submittedAt: new Date().toISOString()
    });
    rows.sort((a, b) => b.score - a.score);
    saveScoreboard(rows);
}

function isDeviceLocked() {
    return localStorage.getItem(STORAGE_KEYS.deviceLock) === "true";
}

function lockDevice() {
    localStorage.setItem(STORAGE_KEYS.deviceLock, "true");
}

function clearDeviceLock() {
    localStorage.removeItem(STORAGE_KEYS.deviceLock);
}

function showPanel(panel) {
    [entryPanel, quizPanel, scoreboardPanel].forEach((item) => item.classList.add("hidden"));
    panel.classList.remove("hidden");
}

function showEntryMessage(message) {
    entryMessage.textContent = message;
    entryMessage.classList.remove("hidden");
}

function clearEntryMessage() {
    entryMessage.textContent = "";
    entryMessage.classList.add("hidden");
}

function showAdminMessage(message) {
    adminMessage.textContent = message;
    adminMessage.classList.remove("hidden");
}

function clearAdminMessage() {
    adminMessage.textContent = "";
    adminMessage.classList.add("hidden");
}

function verifyAdminPasscode() {
    if (adminPasscodeInput.value !== ADMIN_PASSCODE) {
        showAdminMessage("Invalid admin passcode.");
        return false;
    }
    return true;
}

function updateEntryLockState() {
    if (SINGLE_ATTEMPT_MODE && isDeviceLocked()) {
        startQuizButton.disabled = true;
        showEntryMessage("Quiz already submitted on this device. Single-attempt mode is active.");
    } else {
        startQuizButton.disabled = false;
        clearEntryMessage();
    }
}

function handleAdminClearLock() {
    if (!verifyAdminPasscode()) {
        return;
    }
    clearDeviceLock();
    updateEntryLockState();
    showAdminMessage("Device lock cleared.");
}

function handleAdminClearScoreboard() {
    if (!verifyAdminPasscode()) {
        return;
    }
    saveScoreboard([]);
    renderScoreboard();
    showAdminMessage("Scoreboard reset.");
}

function handleAdminClearAll() {
    if (!verifyAdminPasscode()) {
        return;
    }
    clearDeviceLock();
    saveScoreboard([]);
    renderScoreboard();
    updateEntryLockState();
    showAdminMessage("Device lock and scoreboard reset.");
}

function renderScoreboard() {
    const rows = getScoreboard();
    scoreboardList.innerHTML = "";

    if (rows.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.textContent = "No submissions yet.";
        scoreboardList.appendChild(emptyItem);
        return;
    }

    rows.forEach((entry, index) => {
        const row = document.createElement("li");
        const date = new Date(entry.submittedAt).toLocaleString();
        row.textContent = `#${index + 1} ${entry.name} - ${entry.score}/${entry.total} (${date})`;
        scoreboardList.appendChild(row);
    });
}

// === Core Quiz Functions ===
function loadQuestion() {
    const q = questions[currentQuestionIndex];
    if (!q) {
        showSummary();
        return;
    }

    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    questionElement.textContent = q.question;
    answersElement.innerHTML = "";
    feedbackElement.classList.add("hidden");
    feedbackElement.innerHTML = "";

    q.answers.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = answer;
        btn.className = "answer-button";
        btn.addEventListener("click", () => checkAnswer(index));
        answersElement.appendChild(btn);
    });

    updateProgress();
}

function checkAnswer(selectedIndex) {
    const q = questions[currentQuestionIndex];
    const correctIndex = q.correct;
    const buttons = Array.from(answersElement.children);

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === correctIndex) {
            btn.classList.add("correct");
        } else if (i === selectedIndex) {
            btn.classList.add("incorrect");
        }
    });

    if (selectedIndex === correctIndex) {
        correctAnswers++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setTimeout(loadQuestion, 900);
    } else {
        setTimeout(showSummary, 900);
    }
}

function showSummary() {
    updateProgress(true);
    saveResult(playerName, correctAnswers, questions.length);

    const ranks = [
        { max: 3, title: "Aviation Enthusiast in Training", note: "Keep learning and exploring the world of aviation!" },
        { max: 6, title: "Jet Engine Explorer", note: "You're getting the hang of it. Keep soaring higher!" },
        { max: 9, title: "Aerospace Ace", note: "Amazing work. You really know your GE Aerospace trivia!" },
        { max: Infinity, title: "GE Aerospace Legend", note: "Congratulations. You're a true GE Aerospace trivia expert!" }
    ];
    const { title, note } = ranks.find((rank) => correctAnswers <= rank.max);

    questionElement.textContent = "Quiz Complete";
    questionCounter.textContent = "";
    answersElement.innerHTML = "";
    feedbackElement.innerHTML = `
        <p><strong>${playerName}</strong>, your score is <strong>${correctAnswers}/${questions.length}</strong>.</p>
        <p class="rank">${title}</p>
        <p>${note}</p>
    `;
    feedbackElement.classList.remove("hidden");

    viewScoreboardButton.classList.remove("hidden");

    if (SINGLE_ATTEMPT_MODE) {
        lockDevice();
        restartButton.classList.add("hidden");
    } else {
        restartButton.classList.remove("hidden");
    }
}

function updateProgress(complete = false) {
    const pct = complete ? 100 : ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFill.style.width = `${pct}%`;
    progressFill.closest("[role='progressbar']").setAttribute("aria-valuenow", Math.round(pct));
}

function startQuiz() {
    if (SINGLE_ATTEMPT_MODE && isDeviceLocked()) {
        showEntryMessage("This device has already submitted a quiz. Replays are currently disabled.");
        return;
    }

    const enteredName = playerNameInput.value.trim();
    if (enteredName.length < 2) {
        showEntryMessage("Please enter a valid name (at least 2 characters).");
        return;
    }

    clearEntryMessage();
    playerName = enteredName;
    questions = pickRandomQuestions();
    currentQuestionIndex = 0;
    correctAnswers = 0;

    feedbackElement.classList.add("hidden");
    feedbackElement.innerHTML = "";
    restartButton.classList.add("hidden");
    viewScoreboardButton.classList.add("hidden");

    showPanel(quizPanel);
    loadQuestion();
}

function openScoreboard() {
    renderScoreboard();
    showPanel(scoreboardPanel);
}

function initApp() {
    showPanel(entryPanel);
    clearEntryMessage();
    clearAdminMessage();
    updateEntryLockState();
}

// === Events ===
startQuizButton.addEventListener("click", startQuiz);
playerNameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        startQuiz();
    }
});
adminPasscodeInput.addEventListener("input", clearAdminMessage);
adminClearLockButton.addEventListener("click", handleAdminClearLock);
adminClearScoreboardButton.addEventListener("click", handleAdminClearScoreboard);
adminClearAllButton.addEventListener("click", handleAdminClearAll);
restartButton.addEventListener("click", startQuiz);
viewScoreboardEntryButton.addEventListener("click", openScoreboard);
viewScoreboardButton.addEventListener("click", openScoreboard);
backToEntryButton.addEventListener("click", () => showPanel(entryPanel));

// === Start ===
initApp();
