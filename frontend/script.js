// script.js

// General script to handle navigation and other global functionalities
document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logout-button");

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "index.html";
    });
  }

  // Example: Highlight active link in navigation (if applicable)
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });
});

// Toggle between login and signup sections
const showSignup = document.getElementById("show-signup");
const showLogin = document.getElementById("show-login");
if (showSignup) {
  showSignup.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default link behavior
    document.getElementById("login-section").style.display = "none";
    document.getElementById("signup-section").style.display = "block";
  });
}

if (showLogin) {
  showLogin.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default link behavior
    document.getElementById("signup-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
  });
}

// Handle login form submission
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    try {
      const response = await fetch("https://fitknight-01ae.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        // Redirect based on role
        if (data.role === "buddy") {
          window.location.href = "buddy-dashboard.html";
        } else if (data.role === "organizer") {
          window.location.href = "organizer-dashboard.html";
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred while logging in. Please try again.");
    }
  });
}

// Handle signup form submission
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const role = document.getElementById("signup-role").value;
    const roleDetails = role === "buddy" ? {
      fitnessGoals: document.getElementById("fitness-goals").value,
      workoutPreferences: document.getElementById("workout-preferences").value,
      availability: document.getElementById("availability").value,
    } : {}; // No additional details for organizer during signup

    const formData = new FormData();
    formData.append("username", document.getElementById("signup-username").value);
    formData.append("password", document.getElementById("signup-password").value);
    formData.append("role", role);
    formData.append("roleDetails", JSON.stringify(roleDetails));
    formData.append("profilePicture", document.getElementById("profile-picture").files[0]);

    try {
      const response = await fetch("https://fitknight-01ae.onrender.com/auth/signup", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        // Automatically log the user in after signup
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        if (data.role === "buddy") {
          window.location.href = "profile-edit.html";
        } else if (data.role === "organizer") {
          window.location.href = "organizer-dashboard.html";
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred while signing up. Please try again.");
    }
  });
}
