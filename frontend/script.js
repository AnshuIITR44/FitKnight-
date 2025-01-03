// Toggle between login and signup sections
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

// Handle login form submission
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok && data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

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

  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  const role = document.getElementById("signup-role").value;

  const roleDetails = role === "buddy" ? {
    fitnessGoals: document.getElementById("fitness-goals").value,
    workoutPreferences: document.getElementById("workout-preferences").value,
    availability: document.getElementById("availability").value,
  } : {};

  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("role", role);
  formData.append("roleDetails", JSON.stringify(roleDetails));

  const profilePicture = document.getElementById("profile-picture").files[0];
  if (profilePicture) {
    formData.append("profilePicture", profilePicture);
  }

  try {
    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (response.ok && data.success) {
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
