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
    localStorage.setItem("token", data.token); // Save token for authentication
    window.location.href = "dashboard.html"; // Redirect to dashboard
  } else {
    alert(data.message);
  }
});

// Signup Form Submission
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;
  const role = document.getElementById("signup-role").value;

  const response = await fetch("https://fitknight-01ae.onrender.com/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, role }),
  });

  const data = await response.json();
  if (data.success) {
    alert(data.message);
    window.location.href = "dashboard.html"; // Redirect to dashboard
  } else {
    alert(data.message);
  }
});
