// === App Config and State ===
const QUESTIONS_PER_QUIZ = 10;
const STORAGE_KEYS = {
    scoreboard: "ge_trivia_scoreboard",
    deviceLock: "ge_trivia_device_submitted",
    allowSameNameReplay: "ge_trivia_allow_same_name_replay",
    deviceLockEnabled: "ge_trivia_device_lock_enabled"
};
const ADMIN_PASSCODE = "GE-ADMIN-2026";

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
const adminEnableDeviceLockInput = document.getElementById("admin-enable-device-lock");
const adminAllowNameReplayInput = document.getElementById("admin-allow-name-replay");
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
        { question: "What year was GE Aerospace founded?", answers: ["1905", "1932", "1917", "1945"], correct: 2 },
        { question: "What is GE Aerospace's primary focus?", answers: ["Aircraft interiors", "Navigation systems", "Jet engines", "Satellites"], correct: 2 },
        { question: "What is the name of GE Aerospace's lean operating model?", answers: ["SkyDeck", "AeroLean", "FLIGHT DECK", "JetStream"], correct: 2 },
        { question: "What is the world's most powerful jet engine?", answers: ["GE9X", "LEAP", "GE90", "CF34"], correct: 2 },
        { question: "What is GE Aerospace's commitment to sustainability?", answers: ["Supersonic aircraft", "Space exploration engines", "Sustainable aviation technologies", "Electric cars"], correct: 2 },
        //{ question: "Which engine is used in military applications like the F/A-18 Hornet?", answers: ["GE90", "F404", "CF34", "LEAP"], correct: 1 },
        { question: "What is the significance of the LEAP engine?", answers: ["Most powerful jet engine", "Exclusively for military aircraft", "Fuel efficiency and reduced emissions", "First electric jet engine"], correct: 2 },
        { question: "What are GE Aerospace's priorities in order?", answers: ["Cost, Delivery, Quality, Safety", "Quality, Safety, Delivery, Cost", "Safety, Quality, Delivery, Cost", "Delivery, Cost, Safety, Quality"], correct: 2 },
        //{ question: "Which GE Aerospace engine powers the Boeing 787 Dreamliner?", answers: ["GE90", "LEAP", "CF34", "GEnx"], correct: 3 },
        //{ question: "What is GE Aerospace's approach to lean manufacturing?", answers: ["Kaizen", "Six Sigma", "FLIGHT DECK", "Hoshin Kanri"], correct: 2 },
        { question: "What is the name of GE Aerospace's advanced materials program?", answers: ["NanoMaterials", "Carbon Fiber Composites", "Metallic Alloys", "Ceramic Matrix Composites"], correct: 3 },
        //{ question: "What is GE Aerospace's focus for future aviation?", answers: ["Supersonic jets", "Electric cars", "Space exploration", "Sustainable aviation fuels"], correct: 3 },
        { question: "What is the name of GE Aerospace's additive manufacturing program?", answers: ["AdditiveWorks", "MetalPrint", "3D Aero", "GE Additive"], correct: 3 },
        { question: "What is the primary focus of GE Aerospace's Munich site?", answers: ["Jet engine manufacturing", "Navigation systems", "Aircraft interiors", "Research and development"], correct: 3 },
        { question: "Which advanced technology is developed at GE Aerospace's Munich site?", answers: ["Ceramic Matrix Composites", "Space exploration engines", "Supersonic engines", "Hybrid-electric propulsion"], correct: 3 },
        { question: "What is the name of the GE Aerospace Munich site?", answers: ["GE Aviation Munich", "GE Aerospace Research Center", "GE Aerospace Advanced Technology Center", "GE Munich Innovation Hub"], correct: 2 },
        //{ question: "In which country is GE Aerospace's Munich site located?", answers: ["France", "Austria", "Switzerland", "Germany"], correct: 3 },
        { question: "What type of collaboration is GE Aerospace's Munich site known for?", answers: ["Space exploration", "Military contracts", "Commercial engine production", "University partnerships"], correct: 3 },
        { question: "Which propulsion system is being researched at GE Aerospace Munich?", answers: ["Hydrogen propulsion", "Supersonic propulsion", "Nuclear propulsion", "Hybrid-electric propulsion"], correct: 3 },
        //{ question: "What is a key sustainability focus at GE Aerospace Munich?", answers: ["Space exploration", "Electric aircraft", "Carbon-neutral manufacturing", "Sustainable aviation fuels"], correct: 3 },
        { question: "How does GE Aerospace Munich contribute to GE's global operations?", answers: ["By manufacturing jet engines", "By building satellites", "By producing navigation systems", "By conducting advanced research"], correct: 3 },
        { question: "What is the role of GE Aerospace Munich in hybrid-electric propulsion?", answers: ["Testing", "Marketing", "Manufacturing", "Research and development"], correct: 3 },
        { question: "Which European city is home to GE Aerospace's advanced technology center?", answers: ["Berlin", "Touluse", "Madrid", "Munich"], correct: 3 },
        //{ question: "What is GE Aerospace's approach to sustainability?", answers: ["Supersonic jets", "Electric cars", "Space exploration", "Sustainable aviation fuels"], correct: 3 },
        { question: "Which GE Aerospace engine is used in regional jets?", answers: ["GE9X", "GE90", "LEAP", "CF34"], correct: 3 },
        { question: "Which GE Aerospace engine is used in business jets?", answers: ["CF34", "LEAP", "GE90", "Passport"], correct: 3 },        
        { question: "Which engine powers the Boeing 737 MAX?", answers: ["CF6", "GE90", "LEAP", "GEnx"], correct: 2 },        
        { question: "Which GE Aerospace engine powers the Boeing 777?", answers: ["CF6", "LEAP", "GE90", "GE9X"], correct: 2 },
        { question: "Which GE Aerospace engine powers the Boeing 747?", answers: ["CF6", "GE90", "LEAP", "GEnx"], correct: 0 },
        { question: "Which engine powers the Airbus A320neo?", answers: ["CF6", "GE90", "LEAP", "GEnx"], correct: 2 },
        //{ question: "Which GE Aerospace engine is used in the F-16 fighter jet?", answers: ["F404", "F110", "CF34", "GE90"], correct: 1 },
        { question: "What is GE Aerospace's focus for future propulsion systems?", answers: ["Hybrid-electric propulsion", "Supersonic propulsion", "Nuclear propulsion", "Hydrogen propulsion"], correct: 0 },
        { question: "Which GE Aerospace engine powers the Boeing 777X?", answers: ["GE90", "GE9X", "LEAP", "CF6"], correct: 1 },
        //{ question: "What is the name of GE Aerospace's sustainability initiative?", answers: ["GE Green Aviation", "GE Sustainable Flight", "GE Aviation Sustainability", "GE Aerospace EcoFlight"], correct: 1 },
        { question: "Which GE Aerospace engine is used in the Embraer E-Jet series?", answers: ["CF34", "Passport", "GE90", "LEAP"], correct: 0 },
        { question: "What is GE Aerospace's focus for additive manufacturing?", answers: ["Ceramic Matrix Composites", "3D printing", "Carbon Fiber Composites", "NanoMaterials"], correct: 1 },
        { question: "Which GE Aerospace engine powers the Boeing 767?", answers: ["GE90", "GEnx", "LEAP", "CF6"], correct: 3 },
        { question: "How many employees does GE Aerospace have globally?", answers: ["35,000", "46,000", "57,000", "68,000"], correct: 2 },
        { question: "In which country is GE Aerospace's headquarters located?", answers: ["Germany", "United States", "France", "United Kingdom"], correct: 1 },
        { question: "Which city is home to GE Aerospace's headquarters?", answers: ["Cincinnati", "Munich", "Paris", "Boston"], correct: 0 },
        { question: "How many GE Aerospace sites are there worldwide?", answers: ["50", "75", "100", "125"], correct: 2 },
        { question: "Which of the following is NOT a GE Aerospace site?", answers: ["Munich", "Evendale", "Bangalore", "Seattle"], correct: 3 },
        //{ question: "What is the primary focus of GE Aerospace's Bangalore site?", answers: ["Manufacturing", "Research and development", "Engine testing", "Marketing"], correct: 1 },
        { question: "Which GE Aerospace site specializes in additive manufacturing?", answers: ["Munich", "Evendale", "Bangalore", "West Chester"], correct: 1 },
        { question: "In which continent does GE Aerospace have the most sites?", answers: ["North America", "Europe", "Asia", "South America"], correct: 0 },
        { question: "Which GE Aerospace site is known for its work on hybrid-electric propulsion?", answers: ["Munich", "Bangalore", "Evendale", "Lynn"], correct: 0 },
        //{ question: "What is the role of GE Aerospace's Lynn site?", answers: ["Military engine production", "Commercial engine production", "Research and development", "Additive manufacturing"], correct: 0 },
        { question: "Which of the following engines is NOT produced by GE Aerospace?", answers: ["GE90", "LEAP", "PW1000G", "GEnx"], correct: 2 },
        { question: "Which of the following engines is produced by CFM International?", answers: ["GE90", "LEAP", "CF6", "GEnx"], correct: 1 },
        { question: "What does CFM stand for in CFM International?", answers: ["Commercial Flight Motors", "Collaborative Flight Manufacturing", "Customer Focused Manufacturing", "Nothing (it's a combination of GE and Safran names)"], correct: 3 },
        { question: "Which engine powers the Boeing 737 MAX?", answers: ["CF6", "GE90", "LEAP", "GEnx"], correct: 2 },
        { question: "Which engine powers the Airbus A320neo?", answers: ["CF6", "GE90", "LEAP", "PW1000G"], correct: 2 },
        { question: "Which engine powers the Boeing 777X?", answers: ["GE90", "GE9X", "LEAP", "CF6"], correct: 1 },
        //{ question: "Which engine powers the Boeing 747?", answers: ["CF6", "GE90", "LEAP", "GEnx"], correct: 0 },
        //{ question: "Which engine powers the Boeing 787 Dreamliner?", answers: ["GE90", "GEnx", "CF34", "LEAP"], correct: 1 },
        //{ question: "Which engine powers the Embraer E-Jet series?", answers: ["CF34", "Passport", "GE90", "LEAP"], correct: 0 },
        { question: "Which engine powers the Bombardier Global 7500 business jet?", answers: ["CF34", "Passport", "GE90", "LEAP"], correct: 1 },
        { question: "In what year did the GE90 engine enter service?", answers: ["1990", "1995", "2000", "2005"], correct: 1 },
        { question: "In what year did the GEnx engine enter service?", answers: ["2007", "2009", "2011", "2013"], correct: 2 },
        { question: "In what year did the LEAP engine enter service?", answers: ["2014", "2016", "2018", "2020"], correct: 1 },
        { question: "In what year did the CF6 engine enter service?", answers: ["1965", "1970", "1975", "1980"], correct: 1 },
        { question: "In what year did the Passport engine enter service?", answers: ["2015", "2016", "2017", "2018"], correct: 3 },
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

const newQuestions = [
        {
            question: "What percentage improvement in fuel efficiency does GE Aerospace say its commercial engines today have versus engines made in the 1970s?",
            answers: ["30%", "40%", "50%", "60%"],
            correct: 1
        },
        {
            question: "What is GE Aerospace's target fuel-efficiency improvement for next-generation technologies versus today\'s most efficient commercial engines?",
            answers: ["10%", "15%", "20%", "25%"],
            correct: 2
        },
        {
            question: "About how much did GE Aerospace spend on research and development in 2024?",
            answers: ["$1.5 billion", "$2.0 billion", "$2.7 billion", "$3.5 billion"],
            correct: 2
        },
        {
            question: "What is GE Aerospace's top operational priority?",
            answers: ["Safety", "Speed", "Cost", "Growth"],
            correct: 0
        },
        {
            question: "What kind of environment does GE Aerospace say prospective employees will find on its careers page?",
            answers: ["A quiet, strictly individual environment", "A dynamic environment", "A fully remote environment", "A highly seasonal environment"],
            correct: 1
        },
        {
            question: "What does GE Aerospace encourage employees to do with their careers?",
            answers: ["Follow the same path as everyone else", "Wait for opportunities to arrive", "Own your career", "Avoid taking on new challenges"],
            correct: 2
        },
        {
            question: "What does GE Aerospace say strong teams need to generate new ideas and business success?",
            answers: ["Diverse perspectives", "Longer meetings", "More hierarchy", "Fewer experiments"],
            correct: 0
        }
];

const wordQuestions = [
        {
            question: "At any given moment, about what share of planes flying worldwide are powered by GE Aerospace and CFM engines?",
            answers: ["1 out of 2", "2 out of 3", "3 out of 4", "9 out of 10"],
            correct: 2
        },
        {
            question: "In how many European countries does GE Aerospace operate?",
            answers: ["12", "18", "24", "30"],
            correct: 1
        },
        {
            question: "Approximately how many GE Aerospace employees are based across Europe?",
            answers: ["8,000", "10,500", "12,000", "13,000"],
            correct: 3
        },
        {
            question: "How many apprenticeships per year does GE Aerospace support across Europe?",
            answers: ["50", "75", "90", "100"],
            correct: 3
        },
        {
            question: "How much is GE Aerospace investing in European manufacturing in 2026?",
            answers: ["EUR 40 million", "EUR 75 million", "EUR 110+ million", "EUR 200 million"],
            correct: 2
        },
        {
            question: "How much is GE Aerospace investing across European MRO and component repair facilities in 2026?",
            answers: ["EUR 20 million", "EUR 40 million", "EUR 60 million", "EUR 80 million"],
            correct: 1
        },
        {
            question: "About how much does GE Aerospace spend globally on R&D each year?",
            answers: ["USD 1 billion", "USD 2 billion", "USD 2.5 billion", "USD 3 billion"],
            correct: 3
        },
        {
            question: "The most recently introduced GE Aerospace commercial engine products are approximately how much more fuel efficient than their predecessors?",
            answers: ["5-8%", "10-15%", "18-20%", "25-30%"],
            correct: 1
        },
        {
            question: "How long has CFM partnered with Safran Aircraft Engines?",
            answers: ["About 20 years", "About 35 years", "About 50+ years", "About 70 years"],
            correct: 2
        },
        {
            question: "Roughly how many aircraft have been delivered globally with CFM56 engines?",
            answers: ["4,500+", "8,000+", "10,000+", "14,000+"],
            correct: 3
        },
        {
            question: "In what year was the CFM RISE program unveiled?",
            answers: ["2018", "2021", "2022", "2023"],
            correct: 1
        },
        {
            question: "What fuel-efficiency improvement is GE Aerospace targeting in one generation with RISE technologies versus engines today?",
            answers: ["10%", "15%", "20%", "35%"],
            correct: 2
        },
        {
            question: "Which architecture is described as the most promising path for next-generation engine efficiency?",
            answers: ["Open Fan", "Geared turbofan", "Variable bypass fan", "Ramjet hybrid"],
            correct: 0
        },
        {
            question: "Which country is specifically cited for major low-pressure turbine module testing for RISE?",
            answers: ["Poland", "Sweden", "Italy", "Germany"],
            correct: 0
        },
        {
            question: "GE Aerospace is collaborating with which airframer on engine and aircraft integration work for a flight demonstrator this decade?",
            answers: ["Airbus", "Boeing", "Embraer", "Dassault"],
            correct: 0
        },
        {
            question: "Which certified engine is highlighted as designed, developed, and tested in Europe?",
            answers: ["Catalyst", "Passport", "LEAP", "GE9X"],
            correct: 0
        },
        {
            question: "In which Clean Aviation project is GE Aerospace not involved?",
            answers: ["OFELIA", "UNIFIED", "AMBER", "HYDEA"],
            correct: 1
        },
        {
            question: "Which set of technologies is NOT being investigated in the RISE technology program?",
            answers: ["Open Fan", "Compact Core", "Hybrid Electric", "Variable Cycle"],
            correct: 3
        }
];

// === Pool Builder ===
function buildQuestionPool() {
    const all = [...existingQuestions, ...riseQuestions, ...newQuestions, ...wordQuestions];
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

function normalizeName(value) {
    return value.trim().toLowerCase();
}

function nameExistsInScoreboard(name) {
    const normalized = normalizeName(name);
    if (!normalized) {
        return false;
    }

    return getScoreboard().some((entry) => normalizeName(entry.name) === normalized);
}

function isSameNameReplayAllowed() {
    return localStorage.getItem(STORAGE_KEYS.allowSameNameReplay) === "true";
}

function setSameNameReplayAllowed(isAllowed) {
    localStorage.setItem(STORAGE_KEYS.allowSameNameReplay, String(isAllowed));
}

function isDeviceLockEnabled() {
    return localStorage.getItem(STORAGE_KEYS.deviceLockEnabled) === "true";
}

function setDeviceLockEnabled(isEnabled) {
    localStorage.setItem(STORAGE_KEYS.deviceLockEnabled, String(isEnabled));
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

function updateReplayButtonState() {
    if (isDeviceLockEnabled() || !isSameNameReplayAllowed()) {
        restartButton.classList.add("hidden");
        return;
    }
    restartButton.classList.remove("hidden");
}

function initReplayPolicyControl() {
    adminEnableDeviceLockInput.checked = isDeviceLockEnabled();
    adminAllowNameReplayInput.checked = isSameNameReplayAllowed();
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
    if (isDeviceLockEnabled() && isDeviceLocked()) {
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

function handleAdminAllowNameReplayChange() {
    if (!verifyAdminPasscode()) {
        adminAllowNameReplayInput.checked = isSameNameReplayAllowed();
        return;
    }

    setSameNameReplayAllowed(adminAllowNameReplayInput.checked);
    updateReplayButtonState();

    if (adminAllowNameReplayInput.checked) {
        showAdminMessage("Replay with the same name is now allowed.");
    } else {
        showAdminMessage("Replay with the same name is now blocked.");
    }
}

function handleAdminDeviceLockToggle() {
    if (!verifyAdminPasscode()) {
        adminEnableDeviceLockInput.checked = isDeviceLockEnabled();
        return;
    }

    setDeviceLockEnabled(adminEnableDeviceLockInput.checked);
    updateEntryLockState();
    updateReplayButtonState();

    if (adminEnableDeviceLockInput.checked) {
        showAdminMessage("Device lock is now enabled.");
    } else {
        showAdminMessage("Device lock is now disabled.");
    }
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

    if (isDeviceLockEnabled()) {
        lockDevice();
    }

    updateReplayButtonState();
}

function updateProgress(complete = false) {
    const pct = complete ? 100 : ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFill.style.width = `${pct}%`;
    progressFill.closest("[role='progressbar']").setAttribute("aria-valuenow", Math.round(pct));
}

function startQuiz() {
    if (isDeviceLockEnabled() && isDeviceLocked()) {
        showEntryMessage("This device has already submitted a quiz. Replays are currently disabled.");
        return;
    }

    const enteredName = playerNameInput.value.trim();
    if (enteredName.length < 2) {
        showEntryMessage("Please enter a valid name (at least 2 characters).");
        return;
    }

    if (!isSameNameReplayAllowed() && nameExistsInScoreboard(enteredName)) {
        showEntryMessage("This name already exists on the scoreboard. Please choose a different name.");
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

function handlePlayerNameInput() {
    if (isDeviceLockEnabled() && isDeviceLocked()) {
        return;
    }

    const enteredName = playerNameInput.value.trim();
    if (enteredName.length < 2) {
        clearEntryMessage();
        return;
    }

    if (!isSameNameReplayAllowed() && nameExistsInScoreboard(enteredName)) {
        showEntryMessage("This name is already on the scoreboard. Please choose another name.");
        return;
    }

    clearEntryMessage();
}

function openScoreboard() {
    renderScoreboard();
    showPanel(scoreboardPanel);
}

function initApp() {
    showPanel(entryPanel);
    initReplayPolicyControl();
    updateReplayButtonState();
    clearEntryMessage();
    clearAdminMessage();
    updateEntryLockState();
}

// === Events ===
startQuizButton.addEventListener("click", startQuiz);
playerNameInput.addEventListener("input", handlePlayerNameInput);
playerNameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        startQuiz();
    }
});
adminPasscodeInput.addEventListener("input", clearAdminMessage);
adminEnableDeviceLockInput.addEventListener("change", handleAdminDeviceLockToggle);
adminAllowNameReplayInput.addEventListener("change", handleAdminAllowNameReplayChange);
adminClearLockButton.addEventListener("click", handleAdminClearLock);
adminClearScoreboardButton.addEventListener("click", handleAdminClearScoreboard);
adminClearAllButton.addEventListener("click", handleAdminClearAll);
restartButton.addEventListener("click", startQuiz);
viewScoreboardEntryButton.addEventListener("click", openScoreboard);
viewScoreboardButton.addEventListener("click", openScoreboard);
backToEntryButton.addEventListener("click", () => showPanel(entryPanel));

// === Start ===
initApp();
