function showTab(tab) {
    document.getElementById("login").style.display = tab === "login" ? "block" : "none";
    document.getElementById("register").style.display = tab === "register" ? "block" : "none";
  }
  
  function register() {
    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;
    const email = document.getElementById("reg-email").value;
  
    if (!username || !password || !email) {
      document.getElementById("register-message").innerText = "❗ Please fill all fields.";
      return;
    }
  
    const user = {
      username,
      password,
      email,
      joined: new Date().toLocaleDateString(),
      completedCourses: [],
      quizScores: [0, 0, 0] // HTML, CSS, JS
    };
  
    localStorage.setItem("currentUser", JSON.stringify(user));
    document.getElementById("register-message").innerText = "✅ Registered successfully!";
  }
  
  function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
  
    const user = JSON.parse(localStorage.getItem("currentUser"));
  
    if (user && user.username === username && user.password === password) {
      localStorage.setItem("loggedIn", "true");
      window.location.href = "index.html";
    } else {
      document.getElementById("login-message").innerText = "❌ Invalid credentials.";
    }
  }
  