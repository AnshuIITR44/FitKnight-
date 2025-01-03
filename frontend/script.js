// Toggle between login and signup sections
document.getElementById("show-signup").addEventListener("click", (e) => {
  e.preventDefault(); // Prevent the default link behavior
  document.getElementById("login-section").style.display = "none";
  document.getElementById("signup-section").style.display = "block";
});

document.getElementById("show-login").addEventListener("click", (e) => {
  e.preventDefault(); // Prevent the default link behavior
  document.getElementById("signup-section").style.display = "none";
  document.getElementById("login-section").style.display = "block";
});

// Handle login form submission
document.getElementById("login-form").addEventListener("submit", async (e) => {
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
      alert(data.message || "Invalid login credentials.");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred during login. Please try again.");
  }
});

// Handle signup form submission
document.getElementById("signup-form").addEventListener("submit", async (e) => {
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
  
  if (document.getElementById("profile-picture").files[0]) {
    formData.append("profilePicture", document.getElementById("profile-picture").files[0]);
  }

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
      alert(data.message || "Signup failed. Please try again.");
    }
  } catch (error) {
    console.error("Signup error:", error);
    alert("An error occurred during signup. Please try again.");
  }
});

// Handle logout functionality
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "index.html";
}

// Check authentication status
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token && role) {
    if (role === "buddy") {
      window.location.href = "buddy-dashboard.html";
    } else if (role === "organizer") {
      window.location.href = "organizer-dashboard.html";
    }
  }
});
