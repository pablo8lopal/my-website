// Pool of Questions

const generalQuestions = [
    { question: "What year was GE Aerospace founded?", answers: ["1905", "1917", "1932", "1945"], correct: 1 },
    { question: "What is GE Aerospace's primary focus?", answers: ["Aircraft", "Jet engines", "Navigation systems", "Satellites"], correct: 2},
    { question: "What is GE Aerospace's focus for future aviation?", answers: ["Supersonic jets", "Sustainable aviation fuels", "Space exploration", "Electric cars"], correct: 1 },
    //{ question: "What is GE Aerospace's focus for future propulsion systems?", answers: ["Hybrid-electric propulsion", "Supersonic propulsion", "Nuclear propulsion", "Hydrogen propulsion"], correct: 0 },
    { question: "What are GE Aerospace's priorities in order?", answers: ["Cost, Delivery, Quality, Safety", "Quality, Safety, Delivery, Cost", "Safety, Quality, Delivery, Cost", "Delivery, Cost, Safety, Quality"], correct: 2 },
    { question: "Who is the CEO of GE Aerospace?", answers: ["Elon Musk", "Larry Culp", "Kelly Ortberg", "Dave Calhoun"], correct: 1 },
    { question: "What was GE Aerospace's revenue in 2024?", answers: ["$38.7 billion", "$45.6 billion", "$15.1 billion", "$132.2 billion"], correct: 0 },

    //People & Places
    { question: "How many employees does GE Aerospace have globally?", answers: ["27,000", "32,000", "46,000", "53,000"], correct: 3 },
    { question: "In which country is GE Aerospace's headquarters located?", answers: ["Germany", "United States", "France", "United Kingdom"], correct: 1 },
    { question: "Which city is home to GE Aerospace's headquarters?", answers: ["Cincinnati", "New York", "Seattle", "Boston"], correct: 0 },
    { question: "How many GE Aerospace sites are there worldwide?", answers: ["50", "75", "100", "125"], correct: 2 },
    //{ question: "What is the primary focus of GE Aerospace's Bangalore site?", answers: ["Manufacturing", "Research and development", "Engine testing", "Marketing"], correct: 1 },
    { question: "Which GE Aerospace site specializes in additive manufacturing?", answers: ["Munich", "Evendale", "Bangalore", "West Chester"], correct: 1 },
    { question: "In which continent does GE Aerospace have the most sites?", answers: ["North America", "Europe", "Asia", "South America"], correct: 0 },
    { question: "Which GE Aerospace site is known for its work on hybrid-electric propulsion?", answers: ["Munich", "Bangalore", "Evendale", "Lynn"], correct: 0 },
    //{ question: "What is the role of GE Aerospace's Lynn site?", answers: ["Military engine production", "Commercial engine production", "Research and development", "Additive manufacturing"], correct: 0 },

    //Sustainability
    { question: "What is GE Aerospace's approach to sustainability?", answers: ["Supersonic jets", "Sustainable aviation fuels", "Space exploration", "Electric cars"], correct: 1 },
    //{ question: "What is the name of GE Aerospace's sustainability initiative?", answers: ["GE Green Aviation", "GE Sustainable Flight", "GE Aviation Sustainability", "GE Aerospace EcoFlight"], correct: 1 },

    //Programs
    //{ question: "What is the name of GE Aerospace's additive manufacturing program?", answers: ["AdditiveWorks", "GE Additive", "3D Aero", "MetalPrint"], correct: 1 },
    //{ question: "What is the name of GE Aerospace's advanced materials program?", answers: ["Ceramic Matrix Composites", "Carbon Fiber Composites", "Metallic Alloys", "NanoMaterials"], correct: 0 },
 
    //Other
    //{ question: "What is GE Aerospace's digital platform for engine monitoring?", answers: ["TrueEngine", "AeroTrack", "JetMonitor", "EngineView"], correct: 0 },
    //{ question: "What is the name of GE Aerospace's digital analytics platform?", answers: ["TrueEngine", "AeroTrack", "JetMonitor", "EngineView"], correct: 0 },
    //{ question: "What is the name of GE Aerospace's lean operating model?", answers: ["SkyDeck", "AeroLean", "FLIGHT DECK", "JetStream"], correct: 2 },
    //{ question: "What is GE Aerospace's approach to lean manufacturing?", answers: ["Kaizen", "Six Sigma", "FLIGHT DECK", "Hoshin Kanri"], correct: 2 },
    //{ question: "What is GE Aerospace's focus for additive manufacturing?", answers: ["Ceramic Matrix Composites", "3D printing", "Carbon Fiber Composites", "NanoMaterials"], correct: 1 },

];

 

const cfmQuestions = [
    { question: "What does CFM stand for in CFM International?", answers: ["Commercial Flight Motors", "Collaborative Flight Manufacturing", "Customer Focused Manufacturing", "Nothing (combination of GE and Safran names)"], correct: 3 },
    { question: "Which of the following engines is NOT produced by GE Aerospace?", answers: ["GE90", "LEAP", "PW1000G", "GEnx"], correct: 2 },
    { question: "Which of the following engines is produced by CFM International?", answers: ["GE90", "LEAP", "CF6", "GEnx"], correct: 1 },
    { question: "Which company is GE Aerospace partnered with in CFM International?", answers: ["Rolls-Royce", "Safran Aircraft Engines", "Pratt & Whitney", "Boeing"], correct: 1 },
    { question: "What is the primary focus of CFM International?", answers: ["Developing military engines", "Producing narrow-body aircraft engines", "Creating wide-body aircraft engines", "Manufacturing business jet engines"], correct: 1 },
    { question: "In what year was CFM International founded?", answers: ["1970", "1974", "1980", "1984"], correct: 1 },
    { question: "Which GE Aerospace engine program involves collaboration with NASA?", answers: ["RISE Program", "GE9X Program", "CF6 Program", "Passport Program"], correct: 0 },
    { question: "Which company collaborates with GE Aerospace on the RISE program?", answers: ["Rolls-Royce", "Safran Aircraft Engines", "Pratt & Whitney", "Airbus"], correct: 1 },
    //{ question: "What share of the CFM venture do GE Aerospace and Safran Aircraft Engines have?", answers: ["30-70","50-50","70-30","60-40"], correct: 1 },   
];

const enginesQuestions = [
    // Which engine in plane?
    { question: "What is the world's most powerful jet engine?", answers: ["GE90", "LEAP", "GE9X", "CF34"], correct: 2 },
    { question: "Which GE Aerospace engine powers the Boeing 737 MAX?", answers: ["CF6", "GE90", "LEAP", "GEnx"], correct: 2 },
    { question: "Which GE Aerospace engine powers the Boeing 747?", answers: ["CF6", "GE90", "LEAP", "GEnx"], correct: 0 },
    { question: "Which GE Aerospace engine powers the Boeing 777?", answers: ["CF6", "GE90", "LEAP", "GE9X"], correct: 1 },
    { question: "Which GE Aerospace engine powers the Boeing 777X?", answers: ["GE90", "GE9X", "LEAP", "CF6"], correct: 1 },
    { question: "Which GE Aerospace engine powers the Boeing 787 Dreamliner?", answers: ["GE90", "GEnx", "CF34", "LEAP"], correct: 1 },
    { question: "Which GE Aerospace engine powers the Airbus A320neo?", answers: ["CF6", "GE90", "LEAP", "GEnx"], correct: 2 },
    { question: "Which GE Aerospace engine is used in regional jets?", answers: ["CF34", "GE90", "LEAP", "GE9X"], correct: 0 },
    { question: "Which GE Aerospace engine is used in business jets?", answers: ["CF34", "Passport", "GE90", "LEAP"], correct: 1 },
    { question: "Which GE Aerospace engine is used in the Embraer E-Jet series?", answers: ["CF34", "Passport", "GE90", "LEAP"], correct: 0 },
    { question: "Which engine powers the Bombardier Global 7500 business jet?", answers: ["CF34", "Passport", "GE90", "LEAP"], correct: 1 },
    { question: "Which GE Aerospace engine is used in the F-16 fighter jet?", answers: ["F404", "F110", "CF34", "GE90"], correct: 1 },
    { question: "Which engine is used in military applications like the F/A-18 Hornet?", answers: ["GE90", "F404", "CF34", "LEAP"], correct: 1 },
    // What year EIS?
    { question: "In what year did the GE90 engine enter service?", answers: ["1990", "1995", "2000", "2005"], correct: 1 },
    { question: "In what year did the GEnx engine enter service?", answers: ["2005", "2007", "2010", "2012"], correct: 2 },
    { question: "In what year did the LEAP engine enter service?", answers: ["2014", "2016", "2018", "2020"], correct: 1 },
    { question: "In what year did the CF6 engine enter service?", answers: ["1965", "1970", "1975", "1980"], correct: 1 },
    { question: "In what year did the Passport engine enter service?", answers: ["2015", "2016", "2017", "2018"], correct: 1 },
    { question: "In what year did the GE9X engine enter service?", answers: ["2018", "2019", "2020", "2021"], correct: 2 },
    //Engine Trivia
    { question: "Which GE Aerospace engine was the first to use ceramic matrix composites (CMCs)?", answers: ["GE90", "GEnx", "LEAP", "GE9X"], correct: 2 },
    { question: "Which GE Aerospace engine was the first to use additive manufacturing for production parts?", answers: ["GE90", "GEnx", "LEAP", "GE9X"], correct: 2 },
    { question: "Which GE Aerospace engine was the first to exceed 100,000 pounds of thrust?", answers: ["GE90", "GEnx", "LEAP", "GE9X"], correct: 0 },
    { question: "Which GE Aerospace engine is the most fuel-efficient in its class?", answers: ["GE90", "GEnx", "LEAP", "GE9X"], correct: 2 },
    { question: "What is the significance of the LEAP engine?", answers: ["Most powerful jet engine", "Fuel efficiency and reduced emissions", "Exclusively for military aircraft", "First electric jet engine"], correct: 1 },
    // What engine powers plane?
    { question: "Which plane is powered by the GE90 engine?", answers: ["Boeing 747", "Boeing 777", "Boeing 787", "Airbus A320neo"], correct: 1 },
    { question: "Which plane is powered by the GEnx engine?", answers: ["Boeing 747-8", "Boeing 777", "Boeing 787", "Airbus A350"], correct: 0 },
    { question: "Which plane is powered by the CF6 engine?", answers: ["Boeing 747", "Boeing 737 MAX", "Airbus A320neo", "Bombardier Global 7500"], correct: 0 },
    { question: "Which plane is powered by the LEAP engine?", answers: ["Boeing 737 MAX", "Airbus A330", "Boeing 777X", "Boeing 787"], correct: 0 },
    { question: "Which plane is powered by the Passport engine?", answers: ["Bombardier Global 7500", "Embraer E-Jet", "Boeing 747", "Airbus A320neo"], correct: 0 },
    { question: "Which plane is powered by the GE9X engine?", answers: ["Boeing 777X", "Boeing 787", "Airbus A350", "Boeing 747-8"], correct: 0 },
    { question: "Which plane is powered by the CF34 engine?", answers: ["Embraer E-Jet", "Bombardier Global 7500", "Boeing 737 MAX", "Airbus A320neo"], correct: 0 },
    { question: "Which plane is powered by the GEnx engine?", answers: ["Boeing 787", "Boeing 777", "Airbus A320neo", "Boeing 747-8"], correct: 0 },
    { question: "Which plane is powered by the GE90 engine?", answers: ["Boeing 777", "Boeing 787", "Airbus A350", "Boeing 747-8"], correct: 0 }
    ];
 
const technicalQuestions = [
    { question: "What is the fan diameter of the LEAP engine?", answers: ["78 inches", "81 inches", "85 inches", "90 inches"], correct: 0 },
    { question: "How many fan blades does the LEAP engine have?", answers: ["18", "20", "22", "24"], correct: 0 },
    { question: "What is the overall pressure ratio of the LEAP engine?", answers: ["40:1", "45:1", "50:1", "55:1"], correct: 2 },
    { question: "How does the LEAP engine's specific fuel consumption compare to previous-generation engines?", answers: ["10% lower", "15% lower", "20% lower", "25% lower"], correct: 1 },
    { question: "How many compressor stages does the LEAP engine have?", answers: ["8", "10", "12", "14"], correct: 1 },
    { question: "How many turbine stages does the LEAP engine have?", answers: ["1", "2", "3", "4"], correct: 1 },
    { question: "What material is used for the fan blades in the LEAP engine?", answers: ["Titanium", "Carbon Fiber Composites", "Aluminum", "Ceramic Matrix Composites"], correct: 1 },
    { question: "What is the bypass ratio of the LEAP engine?", answers: ["8:1", "9:1", "10:1", "11:1"], correct: 3 },
    { question: "What is the maximum thrust rating of the LEAP engine?", answers: ["28,000 pounds", "30,000 pounds", "32,000 pounds", "35,000 pounds"], correct: 2 },
    { question: "What type of aircraft is the LEAP engine primarily designed for?", answers: ["Narrow-body aircraft", "Wide-body aircraft", "Military aircraft", "Business jets"], correct: 0 },
    { question: "What is the fan diameter of the GE9X engine?", answers: ["128 inches", "132 inches", "134 inches", "140 inches"], correct: 2 },
    { question: "How many fan blades does the GE9X engine have?", answers: ["16", "18", "20", "22"], correct: 0 },
    { question: "What is the overall pressure ratio of the GE9X engine?", answers: ["50:1", "55:1", "60:1", "65:1"], correct: 2 },
    { question: "How does the GE9X engine's specific fuel consumption compare to previous-generation engines?", answers: ["5% lower", "10% lower", "15% lower", "20% lower"], correct: 1 },
    { question: "How many compressor stages does the GE9X engine have?", answers: ["8", "10", "12", "14"], correct: 2 },
    { question: "How many turbine stages does the GE9X engine have?", answers: ["1", "2", "3", "4"], correct: 1 },
    { question: "What material is used for the fan blades in the GE9X engine?", answers: ["Titanium", "Carbon Fiber Composites", "Aluminum", "Ceramic Matrix Composites"], correct: 1 },
    { question: "What is the bypass ratio of the GE9X engine?", answers: ["8:1", "10:1", "12:1", "14:1"], correct: 1 },
    { question: "What is the maximum thrust rating of the GE9X engine?", answers: ["70,000 pounds", "105,000 pounds", "150,000 pounds", "175,000 pounds"], correct: 1 },
    { question: "What type of aircraft is the GE9X engine primarily designed for?", answers: ["Narrow-body aircraft", "Wide-body aircraft", "Military aircraft", "Business jets"], correct: 1 }
    ];
 
const siteQuestions = [
    { question: "How far away are the GE Aerospace Munich offices from here?", answers: ["500m", "5km", "10k", "20k"], correct: 0 },
    { question: "How many employees work in the GE Aerospace site in Munich?", answers: ["20", "50", "100", "150"], correct: 0 },
    { question: "Which of the following is NOT a GE Aerospace site?", answers: ["Munich", "Evendale", "Bangalore", "Seattle"], correct: 3 },
    { question: "What is the primary focus of GE Aerospace's Munich site?", answers: ["Manufacturing", "Research and development", "Aircraft interiors", "Navigation systems"], correct: 1 },
    { question: "Which advanced technology is developed at GE Aerospace's Munich site?", answers: ["Ceramic Matrix Composites", "Hybrid-electric propulsion", "Supersonic engines", "Space exploration engines"], correct: 1 },
    { question: "What is the name of the GE Aerospace Munich site?", answers: ["GE Aviation Munich", "GE Aerospace Research Center", "GE Aerospace Advanced Technology Center", "GE Munich Innovation Hub"], correct: 2 },
    { question: "In which city in the Munich area is the GE Aerospace site located?", answers: ["Munich", "Unterföhring", "Garching", "Ottobrun"], correct: 2 },
    { question: "What type of collaboration is GE Aerospace's Munich site known for?", answers: ["University partnerships", "Military contracts", "Commercial engine production", "Space exploration"], correct: 0 },
    { question: "Which propulsion system is being researched at GE Aerospace Munich?", answers: ["Hybrid-electric propulsion", "Supersonic propulsion", "Nuclear propulsion", "Hydrogen propulsion"], correct: 0 },
    { question: "How does GE Aerospace Munich contribute to GE's global operations?", answers: ["By manufacturing jet engines", "By conducting advanced research", "By producing navigation systems", "By building satellites"], correct: 1 },
    { question: "What is the role of GE Aerospace Munich in hybrid-electric propulsion?", answers: ["Testing", "Research and development", "Manufacturing", "Marketing"], correct: 1 },
    { question: "Which German city is home to GE Aerospace's Advanced Technology Center?", answers: ["Berlin", "Munich", "Frankfurt", "Hamburg"], correct: 1 }
];

const riseQuestions = [
    {
        question: "What does RISE stand for in GE Aerospace's RISE program?",
        answers: [
            "Revolutionary Innovation for Sustainable Engines",
            "Research in Sustainable Engines",
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
    },
 
    { question: "When was the RISE program launched?", answers: ["2019", "2020", "2021", "2022"], correct: 2 },
    { question: "How many tests have been completed to date on the RISE program", answers: ["50+","100+","200+","250+"], correct: 2 }
];
 
 
const questionPool = [...generalQuestions, ...enginesQuestions,...siteQuestions,...technicalQuestions,...cfmQuestions,...riseQuestions];
 
 
// Randomly select 10 questions for the quiz
let questions = [];
function selectRandomQuestions() {
    const shuffled = questionPool.sort(() => 0.5 - Math.random()); // Shuffle the pool
    questions = shuffled.slice(0, 10); // Select the first 10 questions
}
 
let currentQuestionIndex = 0;
let correctAnswers = 0;
 
// DOM Elements
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const submitButton = document.getElementById("submit-button");
const feedbackElement = document.getElementById("feedback");
const restartButton = document.getElementById("restart-button");
const progressElement = document.getElementById("progress");
 
// Load the first question
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersElement.innerHTML = ""; // Clear previous answers
 
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.classList.add("answer-button");
        button.onclick = () => checkAnswer(index, button); // Pass the clicked button to checkAnswer
        answersElement.appendChild(button);
    });
 
    feedbackElement.classList.add("hidden");
    submitButton.classList.add("hidden");
    updateProgress();
}
 
// Check the selected answer
function checkAnswer(selectedIndex, clickedButton) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctIndex = currentQuestion.correct;
 
    // Highlight the clicked button
    if (selectedIndex === correctIndex) {
        clickedButton.style.backgroundColor = "green"; // Correct answer
        clickedButton.style.color = "white";
    } else {
        clickedButton.style.backgroundColor = "red"; // Wrong answer
        clickedButton.style.color = "white";
 
        // Highlight the correct answer
        const correctButton = answersElement.children[correctIndex];
        correctButton.style.backgroundColor = "green";
        correctButton.style.color = "white";
    }
 
    // Disable all buttons after selection
    Array.from(answersElement.children).forEach(button => {
        button.disabled = true;
    });
 
    // Update score
    if (selectedIndex === correctIndex) {
        correctAnswers++;
    }
 
    // Move to the next question or show summary
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setTimeout(loadQuestion, 1000); // Load next question after 1 second
    } else {
        setTimeout(showSummary, 1000); // Show summary after 1 second
    }
}
 
function showSummary() {
    // Calculate the rank based on the number of correct answers
    let rank = "";
    let message = "";
 
    if (correctAnswers <= 3) {
        rank = "Aviation Enthusiast in Training 🚀";
        message = "Keep learning and exploring the world of aviation! You're off to a great start!";
    } else if (correctAnswers <= 6) {
        rank = "Jet Engine Explorer ✈️";
        message = "You're getting the hang of it! Keep soaring higher!";
    } else if (correctAnswers <= 9) {
        rank = "Aerospace Ace 🌟";
        message = "Amazing work! You really know your stuff about GE Aerospace!";
    } else {
        rank = "GE Aerospace Legend 🏆";
        message = "Congratulations! You're a true expert in GE Aerospace trivia!";
    }
 
    // Display the summary message
    questionElement.textContent = "Quiz Complete!";
    answersElement.innerHTML = ""; // Clear the answers section
    feedbackElement.innerHTML = `
        <p>Correct Answers: ${correctAnswers}</p>
        <p>Incorrect Answers: ${questions.length - correctAnswers}</p>
        <p><strong>${rank}</strong></p>
        <p>${message}</p>
    `;
    feedbackElement.classList.remove("hidden");
    restartButton.classList.remove("hidden");
}
 
 
// Restart the quiz
restartButton.onclick = () => {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    restartButton.classList.add("hidden");
    selectRandomQuestions(); // Select a new set of random questions
    loadQuestion();
};
 
// Update progress bar
function updateProgress() {
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressElement.style.width = `${progressPercentage}%`;
}
 
// Initialize the quiz
selectRandomQuestions(); // Select random questions at the start
loadQuestion();
