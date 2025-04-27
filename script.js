/*const currentPage = window.location.pathname;

if (currentPage.includes("index.html")) {
  // Codice per la pagina 1
  welcomePage();
}

if (currentPage.includes("index2.html")) {
  // Codice per la pagina 2
  initQuiz();
}*/

const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: [
      "Ice Cream Sandwich",
      "Jelly Bean",
      "Marshmallow",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];
const currentPage = window.location.pathname;

if (currentPage.includes("index.html")) {
  // Codice per la pagina 1
  welcomePage();
}

if (currentPage.includes("index2.html")) {
  // Codice per la pagina 2
  initQuiz();
}

//prova
function initQuiz() {
  let score = 0;
  let questionsAnswered = 0;
  let currentQuestion = null;
  let selectedAnswer = null;
  const maxQuestions = 10;
  let userAnswers = [] // array che memorizza le risposte date 
  let remainingQuestions = [...questions]; // copia modificabile 
  let countdown

  const answerButtons = [
    document.getElementById("answer1"),
    document.getElementById("answer2"),
    document.getElementById("answer3"),
    document.getElementById("answer4"),
  ];

  //funzione per mostrare il punteggio finale

  function loadRandomQuestion() {

    // Queste 4 righe qui sotto che riguardano il refresh dell'animazione del cerchio (la rotazione) le ho spostato qui dentro
    // in modo che l animazione riparte sia quando il timer finisce che quando si preme il pulsante per andare avanti con le domande.
    const animation = document.getElementById('animTimer');


    // Rimuovi la classe e forzane il reflow per "resettare"
    animation.classList.remove('circle');

    // Forza il reflow
    void animation.offsetWidth; // questo fa il "reset" effettivo

    // Riaggiungi la classe
    animation.classList.add('circle');


    if (questionsAnswered >= maxQuestions) {
      localStorage.setItem("quizResults", JSON.stringify(userAnswers)); // salva array come stringa JSON (perceh local storage non acceta altro che stringhe)
      localStorage.setItem("finalScore", score); // salva il punteggio
      window.location.href = "index3.html"; // vai alla pagina dei risultati
      return;
    }
    selectedAnswer = null;


    //contatore domande
    document.getElementById("question-number").textContent = `Question ${questionsAnswered + 1} / ${maxQuestions}`;

    // cambia il testo del bottone se siamo all'ultima domanda
    const nextButton = document.getElementById("next-button");
    if (questionsAnswered === maxQuestions - 1) {
      nextButton.textContent = "SUBMIT EXAM";
    } else {
      nextButton.textContent = "NEXT QUESTION";
    }

    //seleziona una domanda casuale
    let randomPick = Math.floor(Math.random() * remainingQuestions.length);
    currentQuestion = remainingQuestions.splice(randomPick, 1)[0]; // rimuove la domanda usata

    const questionText = document.getElementById("question-text");
    questionText.textContent = currentQuestion.question;

    //funzione per mescolare le risposte
    const allAnswers = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers];
    const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

    //funzione per mostrare le risposte se 2 o 4 pulsanti

    answerButtons.forEach((btn, i) => {
      if (i < shuffledAnswers.length) {
        btn.style.display = "inline-block";
        btn.textContent = shuffledAnswers[i];
        btn.classList.remove("selected");
        btn.onclick = () => selectAnswer(btn);
      } else {
        btn.style.display = "none";
        btn.onclick = null;
      }
    });

    clearInterval(countdown); // Ferma il vecchio timer

    countdownDuration = 30; // Riparti da 30 secondi

    countdown = setInterval(function () {
      if (countdownDuration > -1) {
        countdownText.textContent = countdownDuration;
        countdownDuration--;
      } else {
        clearInterval(countdown);

        userAnswers.push({
          question: currentQuestion.question,
          correctAnswer: currentQuestion.correct_answer,
          selectedAnswer: "No answer",
          isCorrect: false
        });

        questionsAnswered++;

        if (questionsAnswered >= maxQuestions) {
          localStorage.setItem("quizResults", JSON.stringify(userAnswers));
          localStorage.setItem("finalScore", score);
          window.location.href = "index3.html";
          return;
        }

        loadRandomQuestion();
      }

      // Animazione cambio colore cerchio
      const animation = document.getElementById('animTimer');

      if (countdownDuration >= 10 && countdownDuration <= 14) {
        animation.style.borderTopColor = "orange";
      } else if (countdownDuration <= 10) {
        animation.style.borderTopColor = "red";
      } else {
        animation.style.borderTopColor = "green";
      }

    }, 1000);
  }

  //funzione per aggiungere la classe selected al pulsante cliccato
  function selectAnswer(button) {
    answerButtons.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
    selectedAnswer = button.textContent;
  }
  //funzione per il click del pulsante next e per controllare se è stata selezionata la risposta corretta
  function nextQuestion() {
    if (!selectedAnswer) {
      alert("Seleziona una risposta prima di continuare!");
      return;
    }

    if (selectedAnswer === currentQuestion.correct_answer) {
      score++;
    }
    // di seguito la funzione per fa si che quando clicchi su next, salvi una risposta nell'array 
    userAnswers.push({
      question: currentQuestion.question,
      correctAnswer: currentQuestion.correct_answer,
      selectedAnswer: selectedAnswer,
      isCorrect: selectedAnswer === currentQuestion.correct_answer
    })

    questionsAnswered++;

    countdownDuration = 30
    loadRandomQuestion();

  }
  //fa caricare la pagina e poi fa partire il quiz
  window.addEventListener("DOMContentLoaded", loadRandomQuestion);

  document.getElementById("next-button").addEventListener("click", nextQuestion);

  //Script per animazione timer
  let countdownDuration = 30
  const countdownText = document.getElementById("countdown-text");
  /*let countdown = setInterval(function () {
    if (countdownDuration > -1) {
      countdownText.textContent = countdownDuration;
      countdownDuration--;

    } else {
      // countdownText.textContent = "Tempo scaduto!";
      clearInterval(countdown);

    }
    if (countdownDuration == -1) {
     
      userAnswers.push({
        question: currentQuestion.question,
        correctAnswer: currentQuestion.correct_answer,
        selectedAnswer: "No answer",  
        isCorrect: false
      })
      
      countdownDuration = 30
      questionsAnswered++;
      loadRandomQuestion();

    }

    // Questa parte di codice gestisce il cambio colore del cerchio del timer
    const animation = document.getElementById('animTimer');

    if (countdownDuration > 10 && countdownDuration < 15) {
      animation.style.borderTopColor = "orange"
    } else if (countdownDuration < 10) {
      animation.style.borderTopColor = "red"
    } else {
      animation.style.borderTopColor = "green"
    }

  }, 1000);*/

}


function welcomePage() {
  //funzione per abilitare il pulsante Proceed e mostrare il messaggio se il flag non è selezionato
  const checkbox = document.getElementById("check")
  const span = document.querySelector("span")
  const proceed = document.getElementById("buttonprocedi")

  function vaiNextPagina() {
    if (checkbox.checked) {
      console.log("checkbox checked")
      window.location.href = "index2.html"
    } else {
      console.log("checkbox not checked")
      span.style.display = "block"

    }
  }

  //togliere il click here se checked è true
  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      span.style.display = "none";
    }
  })

  //checkbox.addEventListener("change", attivaBottone);
  proceed.addEventListener("click", vaiNextPagina);



  //fare funzione punteggio finale showFinalScore() quindi collegamento con terza pagina html (nello score registriamo il punteggio finale)










  // //funzione per mescolare le domande
  // function fisherYates(domande) {
  //   for (let i = domande.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [domande[i], domande[j]] = [domande[j], domande[i]];
  //   }
  //   return domande;
  // }

  // let domandeMischiate = fisherYates(questions);
  // console.log(domandeMischiate);

  // function preparaRisposte(domanda) {
  //   return fisherYates([
  //     ...domanda.incorrect_answers,
  //     domanda.correct_answer
  //   ])
  // }

  // console.log(preparaRisposte(questions[0]))


}


