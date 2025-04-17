const user = JSON.parse(localStorage.getItem("user"));
const isLoggedIn = localStorage.getItem("loggedIn");

if (!isLoggedIn || !user) {
  alert("You must log in first.");
  window.location.href = "login.html";
} else {
  document.getElementById("greeting").innerText = `Welcome back, ${user.username}! 👋`;
}

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}
