document.getElementById("show-signup").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("login-section").style.display = "none";
  document.getElementById("signup-section").style.display = "block";
});

document.getElementById("show-login").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("signup-section").style.display = "none";
  document.getElementById("login-section").style.display = "block";
});

// Login Form Submission
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const response = await fetch("https://fitknight-01ae.onrender.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (data.success) {
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  } else {
    alert(data.message);
  }
});

// Signup Form Submission
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("username", document.getElementById("signup-username").value);
  formData.append("password", document.getElementById("signup-password").value);
  formData.append("role", document.getElementById("signup-role").value);
  formData.append("profilePicture", document.getElementById("profile-picture").files[0]);

  const response = await fetch("https://fitknight-01ae.onrender.com/auth/signup", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (data.success) {
    alert(data.message);
    document.getElementById("signup-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
  } else {
    alert(data.message);
  }
});
