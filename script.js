const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);


/* ================= MENU ================= */

const menuBtn = $("#menuBtn");
const navMenu = $("#navMenu");

menuBtn.addEventListener("click", () => {

  const open = navMenu.classList.toggle("active");

  menuBtn.textContent = open ? "✕" : "☰";

});


$$("nav a").forEach(link => {

  link.addEventListener("click", () => {

    navMenu.classList.remove("active");
    menuBtn.textContent = "☰";

  });

});


/* ================= THEME ================= */

const themeBtn = $("#themeBtn");

const savedTheme =
  localStorage.getItem("cybershield-theme");

if(savedTheme === "light"){

  document.body.classList.add("light");
  themeBtn.textContent = "🌙";

}


themeBtn.addEventListener("click", () => {

  document.body.classList.toggle("light");

  const light =
    document.body.classList.contains("light");

  themeBtn.textContent =
    light ? "🌙" : "☀️";

  localStorage.setItem(
    "cybershield-theme",
    light ? "light" : "dark"
  );

  showToast(
    light
      ? "☀️ Light mode enabled"
      : "🌙 Dark mode enabled"
  );

});


/* ================= NAVIGATION ================= */

function goTo(id){

  const section =
    document.getElementById(id);

  if(section){

    section.scrollIntoView({
      behavior:"smooth"
    });

  }

}


$$("[data-target]").forEach(card => {

  card.addEventListener("click", () => {

    goTo(card.dataset.target);

  });

});


/* ================= TOAST ================= */

const toast = $("#toast");

let toastTimer;

function showToast(message){

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {

    toast.classList.remove("show");

  },2200);

}


/* ================= PASSWORD CHECKER ================= */

const passwordInput =
  $("#passwordInput");

const showPassword =
  $("#showPassword");

const clearPassword =
  $("#clearPassword");

const strengthProgress =
  $("#strengthProgress");

const strengthText =
  $("#strengthText");

const strengthScore =
  $("#strengthScore");

const passwordStatus =
  $("#passwordStatus");


function requirement(
  id,
  passed
){

  const element =
    document.getElementById(id);

  const text =
    element.textContent
      .replace(/^[✓○]\s*/,"");

  element.textContent =
    `${passed ? "✓" : "○"} ${text}`;

  element.style.color =
    passed
      ? "var(--green)"
      : "var(--muted)";

}


function checkPassword(){

  const password =
    passwordInput.value;


  if(!password){

    strengthProgress.style.width = "0%";

    strengthScore.textContent =
      "0/100";

    strengthText.textContent =
      "Enter password";

    passwordStatus.textContent =
      "Not Checked";

    requirement("reqLength",false);
    requirement("reqUpper",false);
    requirement("reqLower",false);
    requirement("reqNumber",false);
    requirement("reqSpecial",false);

    updateScore(
      87,
      "Good Protection"
    );

    return;

  }


  const length =
    password.length >= 8;

  const upper =
    /[A-Z]/.test(password);

  const lower =
    /[a-z]/.test(password);

  const number =
    /[0-9]/.test(password);

  const special =
    /[^A-Za-z0-9]/.test(password);


  let score = 0;


  if(length)
    score += 20;

  if(password.length >= 12)
    score += 10;

  if(upper)
    score += 20;

  if(lower)
    score += 20;

  if(number)
    score += 15;

  if(special)
    score += 15;


  score =
    Math.min(score,100);


  strengthProgress.style.width =
    score + "%";

  strengthScore.textContent =
    score + "/100";


  let label = "Weak";


  if(score >= 90)
    label = "Very Strong";

  else if(score >= 70)
    label = "Strong";

  else if(score >= 40)
    label = "Medium";


  strengthText.textContent =
    label;

  passwordStatus.textContent =
    label;


  requirement(
    "reqLength",
    length
  );

  requirement(
    "reqUpper",
    upper
  );

  requirement(
    "reqLower",
    lower
  );

  requirement(
    "reqNumber",
    number
  );

  requirement(
    "reqSpecial",
    special
  );


  const overall =
    Math.max(70,score);


  updateScore(
    overall,
    overall >= 90
      ? "Excellent Protection"
      : "Good Protection"
  );

}


passwordInput.addEventListener(
  "input",
  checkPassword
);


/* SHOW PASSWORD */

showPassword.addEventListener(
  "click",
  () => {

    const hidden =
      passwordInput.type === "password";

    passwordInput.type =
      hidden ? "text" : "password";

    showPassword.textContent =
      hidden ? "🙈" : "👁️";

  }
);


/* CLEAR PASSWORD */

clearPassword.addEventListener(
  "click",
  () => {

    passwordInput.value = "";

    passwordInput.type =
      "password";

    showPassword.textContent =
      "👁️";

    checkPassword();

    showToast(
      "Password field cleared"
    );

  }
);


/* ================= SCORE ================= */

function updateScore(
  score,
  status
){

  $("#securityScore")
    .textContent = score + "%";

  $("#scoreBar")
    .style.width = score + "%";

  $("#securityStatus")
    .textContent = status;

  $("#scoreCircle").style.background =
    `
    radial-gradient(
      circle,
      var(--card) 61%,
      transparent 62%
    ),
    conic-gradient(
      var(--cyan) ${score}%,
      #142638 0
    )
    `;

  $("#scoreUpdated")
    .textContent =
      "Updated just now";

}


/* ================= PASSWORD GENERATOR ================= */

const generatedPassword =
  $("#generatedPassword");

const generateBtn =
  $("#generateBtn");

const passwordLength =
  $("#passwordLength");

const lengthValue =
  $("#lengthValue");

const copyPassword =
  $("#copyPassword");


const upperChars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const lowerChars =
  "abcdefghijklmnopqrstuvwxyz";

const numberChars =
  "0123456789";

const specialChars =
  "!@#$%^&*()_+-=[]{}";

const allChars =
  upperChars +
  lowerChars +
  numberChars +
  specialChars;


function randomNumber(max){

  if(
    window.crypto &&
    crypto.getRandomValues
  ){

    const array =
      new Uint32Array(1);

    crypto.getRandomValues(array);

    return array[0] % max;

  }

  return Math.floor(
    Math.random() * max
  );

}


function generatePassword(){

  const length =
    Number(passwordLength.value);


  let password = [

    upperChars[
      randomNumber(upperChars.length)
    ],

    lowerChars[
      randomNumber(lowerChars.length)
    ],

    numberChars[
      randomNumber(numberChars.length)
    ],

    specialChars[
      randomNumber(specialChars.length)
    ]

  ];


  while(password.length < length){

    password.push(
      allChars[
        randomNumber(allChars.length)
      ]
    );

  }


  for(
    let i=password.length-1;
    i>0;
    i--
  ){

    const j =
      randomNumber(i+1);

    [
      password[i],
      password[j]
    ] =
    [
      password[j],
      password[i]
    ];

  }


  generatedPassword.value =
    password.join("");

}


passwordLength.addEventListener(
  "input",
  () => {

    lengthValue.textContent =
      passwordLength.value;

    generatePassword();

  }
);


generateBtn.addEventListener(
  "click",
  () => {

    generatePassword();

    showToast(
      "🔑 New password generated"
    );

  }
);


copyPassword.addEventListener(
  "click",
  async () => {

    if(!generatedPassword.value)
      generatePassword();


    try{

      await navigator.clipboard
        .writeText(
          generatedPassword.value
        );

      showToast(
        "✓ Password copied"
      );

    }

    catch{

      generatedPassword.select();

      document.execCommand("copy");

      showToast(
        "✓ Password copied"
      );

    }

  }
);


generatePassword();


/* ================= SECURITY SCAN ================= */

const checks =
  $$(".security-check");


function calculateScan(){

  const passed =
    [...checks]
      .filter(item => item.checked)
      .length;

  const total =
    checks.length;

  const score =
    Math.round(
      (passed / total) * 100
    );


  updateScore(
    score,
    score >= 80
      ? "Good Protection"
      : score >= 50
        ? "Needs Improvement"
        : "Improve Protection"
  );


  $("#protectedSystems")
    .textContent =
    String(
      20 + passed
    ).padStart(2,"0");


  $("#activeRisks")
    .textContent =
    String(
      total - passed
    ).padStart(2,"0");


  $("#scanResult")
    .textContent =
    `
    ${passed}/${total} security checks completed.
    Your score is ${score}%.
    `;


  showToast(
    `🔎 Scan complete: ${score}%`
  );

}


$("#calculateScan")
  .addEventListener(
    "click",
    calculateScan
  );


$("#scanBtn")
  .addEventListener(
    "click",
    () => {

      goTo("tools");

      setTimeout(
        calculateScan,
        500
      );

    }
  );


/* ================= ACCOUNT SECURITY ================= */

const accountResult =
  $("#accountResult");


$$(".action-btn")
.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      accountResult.textContent =
        button.dataset.message;

      accountResult.style.color =
        "var(--cyan)";

    }
  );

});


/* ================= THREATS ================= */

const threatInfo =
  $("#threatInfo");


const threatMessages = {

  "Phishing":
    "Phishing uses fake messages or websites to trick people. Always verify unexpected requests.",

  "Malware":
    "Malware is harmful software. Keep your system updated and download software from trusted sources.",

  "Data Breach":
    "A data breach can expose information. Use unique passwords and enable 2FA.",

  "Malicious Links":
    "Unexpected links can lead to scams. Check the destination before clicking."

};


$$(".threat-button")
.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const name =
        button.dataset.threat;

      threatInfo.textContent =
        threatMessages[name];

      threatInfo.style.color =
        "var(--cyan)";

    }
  );

});


/* ================= QUIZ ================= */

const questions = [

  {
    question:
      "What should you do with a suspicious email link?",

    answers:[
      "Click it immediately",
      "Verify the link first",
      "Share it with friends",
      "Enter your password"
    ],

    correct:1
  },

  {
    question:
      "What does 2FA provide?",

    answers:[
      "Faster internet",
      "Extra account protection",
      "More storage",
      "Free software"
    ],

    correct:1
  },

  {
    question:
      "Which password is generally stronger?",

    answers:[
      "12345678",
      "password123",
      "Fahim2005",
      "A long unique password"
    ],

    correct:3
  },

  {
    question:
      "What should you do with software updates?",

    answers:[
      "Ignore them",
      "Install security updates",
      "Delete them",
      "Only update once a year"
    ],

    correct:1
  },

  {
    question:
      "What is phishing?",

    answers:[
      "A type of online scam",
      "A computer game",
      "A programming language",
      "A backup system"
    ],

    correct:0
  }

];


let currentQuestion = 0;
let quizScore = 0;
let answered = false;


const question =
  $("#question");

const answers =
  $("#answers");

const questionNumber =
  $("#questionNumber");

const quizScoreElement =
  $("#quizScore");

const nextQuestion =
  $("#nextQuestion");

const restartQuiz =
  $("#restartQuiz");

const quizResult =
  $("#quizResult");

const quizProgress =
  $("#quizProgress");


function loadQuestion(){

  answered = false;

  quizResult.textContent = "";

  const current =
    questions[currentQuestion];


  questionNumber.textContent =
    `Question ${
      currentQuestion + 1
    } of ${questions.length}`;


  quizScoreElement.textContent =
    `Score: ${quizScore}`;


  quizProgress.style.width =
    `${
      ((currentQuestion + 1)
      / questions.length) * 100
    }%`;


  question.textContent =
    current.question;


  answers.innerHTML = "";


  current.answers.forEach(
    (text,index) => {

      const button =
        document.createElement(
          "button"
        );

      button.className =
        "answer";

      button.textContent =
        text;

      button.addEventListener(
        "click",
        () => {

          selectAnswer(
            button,
            index
          );

        }
      );

      answers.appendChild(
        button
      );

    }
  );


  nextQuestion.style.display =
    "inline-block";

}


function selectAnswer(
  button,
  selected
){

  if(answered)
    return;

  answered = true;


  const current =
    questions[currentQuestion];


  const buttons =
    $$(".answer");


  buttons.forEach(
    (btn,index) => {

      btn.disabled = true;

      if(
        index === current.correct
      ){

        btn.classList.add(
          "correct"
        );

      }

    }
  );


  if(
    selected === current.correct
  ){

    quizScore++;

    button.classList.add(
      "correct"
    );

    quizResult.textContent =
      "✓ Correct answer!";

    quizResult.style.color =
      "var(--green)";

  }

  else{

    button.classList.add(
      "wrong"
    );

    quizResult.textContent =
      "✕ Wrong answer. The correct answer is highlighted.";

    quizResult.style.color =
      "var(--red)";

  }


  quizScoreElement.textContent =
    `Score: ${quizScore}`;

}


nextQuestion.addEventListener(
  "click",
  () => {

    if(!answered){

      quizResult.textContent =
        "Please select an answer first.";

      quizResult.style.color =
        "var(--yellow)";

      return;

    }


    currentQuestion++;


    if(
      currentQuestion >=
      questions.length
    ){

      const percentage =
        Math.round(
          (quizScore /
          questions.length) * 100
        );


      question.textContent =
        "Quiz Completed! 🎉";

      answers.innerHTML = "";

      nextQuestion.style.display =
        "none";

      quizProgress.style.width =
        "100%";

      quizResult.textContent =
        `Your Score: ${
          quizScore
        }/${questions.length} (${
          percentage
        }%)`;

      quizResult.style.color =
        "var(--cyan)";

      return;

    }


    loadQuestion();

  }
);


restartQuiz.addEventListener(
  "click",
  () => {

    currentQuestion = 0;

    quizScore = 0;

    loadQuestion();

    showToast(
      "🎯 Quiz restarted"
    );

  }
);


loadQuestion();


/* ================= PHISHING ================= */

const phishingResult =
  $("#phishingResult");


$$(".phishing-actions button")
.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      if(
        button.dataset.answer ===
        "phishing"
      ){

        phishingResult.textContent =
          "✓ Correct! This training message has several phishing warning signs.";

        phishingResult.style.color =
          "var(--green)";

      }

      else{

        phishingResult.textContent =
          "✕ Review the warning signs: urgency, unexpected verification and sender verification.";

        phishingResult.style.color =
          "var(--red)";

      }

    }
  );

});


$("#fakeLink")
.addEventListener(
  "click",
  () => {

    phishingResult.textContent =
      "⚠️ Training only. No real website is opened.";

    phishingResult.style.color =
      "var(--yellow)";

  }
);


/* ================= TIPS ================= */

const tipResult =
  $("#tipResult");


$$(".tip-button")
.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      tipResult.textContent =
        button.dataset.tip;

      tipResult.style.color =
        "var(--cyan)";

    }
  );

});


/* ================= SCROLL ANIMATION ================= */

const cards =
  $$(".tool-card,.stat-card,.tip-card,.quiz-card,.phishing-card,.threat-box");


const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if(entry.isIntersecting){

          entry.target.style.opacity =
            "1";

          entry.target.style.transform =
            "translateY(0)";

          observer.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold:.12
    }
  );


cards.forEach(card => {

  card.style.opacity = "0";

  card.style.transform =
    "translateY(25px)";

  card.style.transition =
    "opacity .6s ease, transform .6s ease";

  observer.observe(card);

});