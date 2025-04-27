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
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
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

if (currentPage.includes("index3.html")) {
  // Codice per la pagina 3
  showFinalScore();
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

    let warning = document.getElementById("select-answer");
    warning.style.display = "none";

    

    clearInterval(countdown); // Ferma il vecchio timer

    countdownDuration = 30; // Riparti da 30 secondi
    countdownText.textContent = countdownDuration;

    countdown = setInterval(function () {
      // Animazione cambio colore cerchio
      const animation = document.getElementById('animTimer');
      console.log(countdownDuration)
      
      if (countdownDuration > 0) {
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

      if (countdownText.textContent >= 11 && countdownText.textContent <= 15) {
        animation.style.borderTopColor = "orange";
      } else if (countdownText.textContent <= 10) {
        animation.style.borderTopColor = "red";
      } else {
        animation.style.borderTopColor = "green";
      }

    }, 1000);



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

    
  }

  //funzione per aggiungere la classe selected al pulsante cliccato
  function selectAnswer(button) {
    answerButtons.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
    selectedAnswer = button.textContent;
  }
  //funzione per il click del pulsante next e per controllare se è stata selezionata la risposta corretta
  function nextQuestion() {
    let warning = document.getElementById("select-answer");
    warning.style.display = "none";
    if (!selectedAnswer) {
      warning.style.display = "block";
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

}

//fare funzione punteggio finale showFinalScore() quindi collegamento con terza pagina html (nello score registriamo il punteggio finale)

function showFinalScore(){
  let answers = JSON.parse(localStorage.getItem("quizResults"));
        let finalScore = localStorage.getItem("finalScore");

        if (finalScore > 5) {
            document.querySelector(".success-gif").style.display = "block";
        } else {
            document.querySelector(".failed-gif").style.display = "block";
        }
        console.log(answers);

        const resultsList = document.getElementById("resultsList");

        // Mostra il punteggio finale sopra la lista
        const scoreParagraph = document.createElement("p");
        scoreParagraph.innerHTML = `<strong>Your Score:</strong> ${finalScore} / ${answers.length}`;
        scoreParagraph.style.fontSize = "20px";
        scoreParagraph.style.marginBottom = "20px";
        scoreParagraph.style.color = "white";
        resultsList.parentNode.insertBefore(scoreParagraph, resultsList);

        answers.forEach(answer => {
            const li = document.createElement("li");

            const isCorrect = answer.isCorrect;

            // Spunta verde o X rossa in base alla risposta
            const resultIcon = isCorrect ? '✅' : '❌';
            const resultColor = isCorrect ? 'green' : 'red';

            li.innerHTML = `
    ${resultIcon}<strong>Question:</strong> ${answer.question}<br>
    <strong>Your Answer:</strong> <span style="color: ${isCorrect ? 'green' : 'red'};">${answer.selectedAnswer}</span><br><br>
    <strong>Correct Answer:</strong> <span style="color: green;">${answer.correctAnswer}</span><br>
    <hr>
  `;

            resultsList.appendChild(li);
            var T = [
                { nome: "Correct Answers", num: 222, col: "green" },
                { nome: "Wrong Answers", num: 563, col: "red" },
            ];
            T[0].num = parseInt(finalScore);
            T[1].num = answers.length - parseInt(finalScore);
            var ctx = CNV.getContext("2d");
            var tot = 0, i;

            //calcolo il totale
            for (i = 0; i < T.length; i++)tot += T[i].num;

            //faccio il grafico
            var ang = 0;
            for (i = 0; i < T.length; i++) {
                var delta = T[i].num / tot * 2 * Math.PI;
                ctx.beginPath();
                ctx.arc(300, 200, 150, ang, ang + delta);
                ctx.strokeStyle = "white";
                ctx.lineWidth = 4;
                ctx.stroke();
                ang += delta;
                ctx.lineTo(300, 200);
                ctx.fillStyle = T[i].col;
                ctx.fill();
            }//fine for

            //faccio la legenda
            var x = 400, y = 40;
            ctx.font = "16px Inter, sans-serif";
            ctx.fontWeight = "normal";

            for (i = 0; i < T.length; i++) {
                ctx.fillStyle = 'white';
                ctx.fillText(T[i].nome, x + 20, y);
                ctx.fillStyle = T[i].col;
                ctx.fillRect(x, y - 10, 10, 10)
                y += 20;
            }//fine for
        });
      }


