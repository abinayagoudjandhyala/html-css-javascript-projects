// Questions data - 5 questions for each set
const marvelQuestions = [
    {
        question: "Which superhero is known as the 'Man of Steel'?",
        options: ["Iron Man", "Superman", "Thor", "Hulk"],
        answer: 2
    },
    {
        question: "What is the real name of Spider-Man?",
        options: ["Bruce Wayne", "Peter Parker", "Clark Kent", "Tony Stark"],
        answer: 2
    },
    {
        question: "Which Infinity Stone is located on Vision's forehead?",
        options: ["Power Stone", "Time Stone", "Mind Stone", "Reality Stone"],
        answer: 3
    },
    {
        question: "Who is the leader of the X-Men?",
        options: ["Wolverine", "Cyclops", "Professor X", "Storm"],
        answer: 3
    },
    {
        question: "What is Captain America's shield made of?",
        options: ["Adamantium", "Vibranium", "Uru", "Carbonadium"],
        answer: 2
    }
];

const dcQuestions = [
    {
        question: "What is Batman's real name?",
        options: ["Bruce Wayne", "Clark Kent", "Barry Allen", "Diana Prince"],
        answer: 1
    },
    {
        question: "Which superhero is known as the 'Fastest Man Alive'?",
        options: ["Green Arrow", "Aquaman", "The Flash", "Cyborg"],
        answer: 3
    },
    {
        question: "What is Wonder Woman's weapon called?",
        options: ["Mjolnir", "Lasso of Truth", "Green Lantern Ring", "Batarang"],
        answer: 2
    },
    {
        question: "Who is the ruler of Atlantis in DC Comics?",
        options: ["Aqualad", "Aquaman", "Namor", "Ocean Master"],
        answer: 2
    },
    {
        question: "What is the name of Batman's butler?",
        options: ["Alfred", "Jeeves", "Pennyworth", "James"],
        answer: 1
    }
];

// Quiz variables
let currentQuestion = 0;
let score = 0;
let userAnswers = Array(5).fill(null);
let quizType = localStorage.getItem('quiztype');
let questions = quizType === 'marvel' ? marvelQuestions : dcQuestions;
const totalQuestions = questions.length;

// DOM Elements
const questionTextEl = document.getElementById('question-text');
const optionBtns = document.querySelectorAll('.option-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const scoreEl = document.getElementById('score');
const questionCounterEl = document.getElementById('question-counter');
const progressFillEl = document.querySelector('.progress-fill');

// Initialize quiz
function initQuiz() {
    showQuestion();
    updateNavButtons();
    updateProgress();
}

// Display current question
function showQuestion() {
    const question = questions[currentQuestion];
    questionTextEl.textContent = question.question;
    
    // Update options
    optionBtns.forEach((btn, index) => {
        btn.querySelector('.option-text').textContent = question.options[index];
        btn.classList.remove('correct', 'wrong');
        btn.disabled = false;
    });
    
    // Restore user's previous answer if exists
    if (userAnswers[currentQuestion] !== null) {
        highlightSelectedOption(userAnswers[currentQuestion]);
    }
    
    // Update UI
    updateProgress();
    updateNavButtons();
}

// Handle option selection
function selectOption(selectedIndex) {
    const question = questions[currentQuestion];
    
    // Store user's answer
    userAnswers[currentQuestion] = selectedIndex;
    
    // Disable all buttons
    optionBtns.forEach(btn => {
        btn.disabled = true;
    });
    
    // Highlight selected option
    highlightSelectedOption(selectedIndex);
    
    // Check if answer is correct and update score
    if (selectedIndex === question.answer) {
        score++;
        scoreEl.classList.add('score-updated');
        setTimeout(() => scoreEl.classList.remove('score-updated'), 500);
    }
    
    // Update score display
    scoreEl.textContent = score;
    
    // Enable navigation buttons
    updateNavButtons();
}

function highlightSelectedOption(selectedIndex) {
    const question = questions[currentQuestion];
    const correctIndex = question.answer;
    
    optionBtns.forEach((btn, index) => {
        if (index + 1 === selectedIndex) {
            if (selectedIndex === correctIndex) {
                btn.classList.add('correct');
            } else {
                btn.classList.add('wrong');
                // Also show the correct answer
                optionBtns[correctIndex - 1].classList.add('correct');
            }
        }
    });
}

// Update progress bar and counter
function updateProgress() {
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    progressFillEl.style.width = `${progress}%`;
    questionCounterEl.textContent = `${currentQuestion + 1}/${totalQuestions}`;
    scoreEl.textContent = score;
}

// Move to next question
function nextQuestion() {
    if (currentQuestion < totalQuestions - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResults();
    }
}

// Move to previous question
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

// Update navigation buttons state
function updateNavButtons() {
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.textContent = currentQuestion === totalQuestions - 1 ? "See Results" : "Next";
}

// Quit quiz and return to main page
function quitQuiz() {
    if (confirm("Are you sure you want to quit the quiz? Your progress will be lost.")) {
        window.location.href = "index.html";
    }
}

// Show results page
function showResults() {
    localStorage.setItem('finalScore', score);
    localStorage.setItem('totalQuestions', totalQuestions);
    localStorage.setItem('quizType', quizType);
    window.location.href = "score.html";
}

// Start the quiz
initQuiz();