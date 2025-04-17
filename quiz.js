if (!localStorage.getItem("loggedIn")) {
    window.location.href = "login.html";
  }
  
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    alert("User not found.");
    window.location.href = "login.html";
  }
  
  const quizData = [
    {
      title: "💡 HTML Basics",
      index: 0,
      certCourse: "HTML",
      questions: [
        { q: "What does HTML stand for?", a: ["HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], correct: 0 },
        { q: "What tag is used for a paragraph?", a: ["<h1>", "<p>", "<br>"], correct: 1 }
      ],
    },
    {
      title: "🎨 CSS Design",
      index: 1,
      certCourse: "CSS",
      questions: [
        { q: "What does CSS stand for?", a: ["Colorful Style Sheet", "Cascading Style Sheets", "Creative Style Syntax"], correct: 1 },
        { q: "Which property changes text color?", a: ["text-color", "color", "font-color"], correct: 1 }
      ],
    },
    {
      title: "⚙️ JavaScript Fun",
      index: 2,
      certCourse: "JavaScript",
      questions: [
        { q: "What is used to declare a variable?", a: ["int", "var", "letvar"], correct: 1 },
        { q: "Which symbol is used for comments?", a: ["//", "#", "--"], correct: 0 }
      ],
    }
  ];
  
  const container = document.getElementById("all-quizzes");
  
  // Sound Effects
  const clickSound = new Audio("assets/sounds/click.mp3");
  const successSound = new Audio("assets/sounds/success.mp3");
  
  // Helper for certificate
  function downloadCertificate(courseName) {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Certificate of Completion", 60, 40);
    doc.setFontSize(16);
    doc.text(`Awarded to: ${user.username}`, 20, 70);
    doc.text(`For successfully completing the ${courseName} course`, 20, 85);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 100);
    doc.save(`${courseName}-Certificate.pdf`);
  }
  
  // Create Quiz Sections
  quizData.forEach((quiz, quizIndex) => {
    const section = document.createElement("div");
    section.className = "quiz-section";
  
    const title = document.createElement("h2");
    title.textContent = quiz.title;
    section.appendChild(title);
  
    quiz.questions.forEach((q, i) => {
      const question = document.createElement("div");
      question.className = "question";
      question.textContent = `${i + 1}. ${q.q}`;
      section.appendChild(question);
  
      const options = document.createElement("div");
      options.className = "options";
  
      q.a.forEach((opt, j) => {
        const id = `q${quizIndex}_${i}_${j}`;
        const label = document.createElement("label");
        label.innerHTML = `
          <input type="radio" name="q${quizIndex}_${i}" value="${j}" id="${id}" />
          ${opt}
        `;
        options.appendChild(label);
      });
  
      section.appendChild(options);
    });
  
    const button = document.createElement("button");
    button.className = "submit-btn";
    button.textContent = "Submit Quiz";
  
    button.onclick = () => {
      clickSound.play(); // play click sound
  
      let score = 0;
      quiz.questions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${quizIndex}_${i}"]:checked`);
        if (selected && parseInt(selected.value) === q.correct) {
          score++;
        }
      });
  
      const result = Math.round((score / quiz.questions.length) * 100);
      user.quizScores[quiz.index] = result;
      localStorage.setItem("currentUser", JSON.stringify(user));
  
      const resultBox = document.createElement("div");
      resultBox.className = "result";
      resultBox.textContent = `✅ You scored ${result}%`;
      section.appendChild(resultBox);
      button.disabled = true;
  
      // 🎉 Confetti & PDF
      if (result === 100) {
        successSound.play();
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
  
        // Certificate download button
        const certBtn = document.createElement("button");
        certBtn.textContent = "🏁 Download Certificate";
        certBtn.className = "submit-btn";
        certBtn.style.backgroundColor = "#007bff";
        certBtn.onclick = () => {
          downloadCertificate(quiz.certCourse);
        };
        section.appendChild(certBtn);
      }
    };
  
    section.appendChild(button);
    container.appendChild(section);
  });
  