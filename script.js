const quizData = [
    {
      question: "When was Google founded?",
      options: ["1996", "1997", "1998", "1999"],
      answer: "1999"
    },
    {
      question: "What is the name of Google's search engine?",
      options: ["Google Search", "Google Lens", "Google Assistant", "Google Scholar"],
      answer: "Google Search"
    },
    {
      question: "Which of the following is Google's parent company?",
      options: ["Alphabet Inc", "Meta Platforms Inc", "Amazon Inc", "Microsoft Corporation"],
      answer: "Alphabet Inc"
    }
  ];
  
  let currentQuestion = 0;
  let score = 0; 
  let selectedOption = null;
  
  const questionEl = document.getElementById("question");
  const optionsList = document.getElementById("options-list");
  const submitBtn = document.getElementById("submit-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const feedbackEl = document.getElementById("feedback");
  const progressEl = document.getElementById("progress");
  
  function loadQuestion() {
    const q = quizData[currentQuestion];
    questionEl.textContent = q.question;
    optionsList.innerHTML = "";
    feedbackEl.textContent = "";
    selectedOption = null;
    progressEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
  
    q.options.forEach(option => {
      const li = document.createElement("li");
      li.textContent = option;
      li.classList.add("option");
      li.addEventListener("click", () => {
        document.querySelectorAll(".option").forEach(opt => opt.classList.remove("selected"));
        li.classList.add("selected");
        selectedOption = option;
      });
      optionsList.appendChild(li);
    });
  }
  
  submitBtn.addEventListener("click", () => {
    if (!selectedOption) return;
    const correct = quizData[currentQuestion].answer;
    if (selectedOption === correct) {
      feedbackEl.textContent = "✅ Correct!";
      score++;
    } else {
      feedbackEl.textContent = `❌ Incorrect. Correct answer: ${correct}`;
    }
    submitBtn.style.display = "none";
    nextBtn.style.display = "inline-block";
  });
  
  nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
      submitBtn.style.display = "inline-block";
      nextBtn.style.display = "none";
    } else {
      showResult();
    }
  });
  
  restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    restartBtn.style.display = "none";
    submitBtn.style.display = "inline-block";
    loadQuestion();
  });
  
  function showResult() {
    questionEl.textContent = `Quiz Completed! Your score: ${score} / ${quizData.length}`;
    optionsList.innerHTML = "";
    feedbackEl.textContent = "";
    nextBtn.style.display = "none";
    submitBtn.style.display = "none";
    restartBtn.style.display = "inline-block";
    progressEl.textContent = "";
  }
  
  // Load the first question on page load
  loadQuestion();