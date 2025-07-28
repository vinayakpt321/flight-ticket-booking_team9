// auth.js

function getUsers() {
  return JSON.parse(localStorage.getItem("flightUsers")) || [];
}

function saveUsers(users) {
  localStorage.setItem("flightUsers", JSON.stringify(users));
}

function registerUser(name, email, password) {
  const users = getUsers();
  if (users.some(user => user.email === email)) return false;
  users.push({ name, email, password });
  saveUsers(users);
  return true;
}

function validateLogin(email, password) {
  const users = getUsers();
  return users.find(user => user.email === email && user.password === password);
}

// Register Page
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();
    const errorBox = document.getElementById("registerError");

    if (password.length < 6) {
      errorBox.textContent = "Password must be at least 6 characters.";
      return;
    }

    const success = registerUser(name, email, password);
    if (success) {
      alert("Registration successful! Please login.");
      window.location.href = "index.html";
    } else {
      errorBox.textContent = "Email already registered.";
    }
  });
}

// Login Page
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const errorBox = document.getElementById("loginError");

    const user = validateLogin(email, password);
    if (user) {
      alert(`Welcome back, ${user.name}!`);
      // window.location.href = "dashboard.html";
    } else {
      errorBox.textContent = "Invalid credentials. Try again.";
    }
  });
}

