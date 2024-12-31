// Handle Signup Form Submission
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const role = document.getElementById("signup-role").value;
  const roleDetails = role === "buddy"
    ? {
        fitnessGoals: document.getElementById("fitness-goals").value,
        workoutPreferences: document.getElementById("workout-preferences").value,
        availability: document.getElementById("availability").value,
      }
    : {}; // No additional details needed for organizers at signup

  const formData = new FormData();
  formData.append("username", document.getElementById("signup-username").value);
  formData.append("password", document.getElementById("signup-password").value);
  formData.append("role", role);
  formData.append("roleDetails", JSON.stringify(roleDetails));
  formData.append("profilePicture", document.getElementById("profile-picture").files[0]);

  const response = await fetch("https://fitknight-01ae.onrender.com/auth/signup", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (data.success) {
    // Automatically log the user in after signup
    const loginResponse = await fetch("https://fitknight-01ae.onrender.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: document.getElementById("signup-username").value,
        password: document.getElementById("signup-password").value,
      }),
    });

    const loginData = await loginResponse.json();
    if (loginData.success) {
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("role", loginData.role);

      // Redirect based on role
      if (loginData.role === "buddy") {
        window.location.href = "profile-edit.html"; // Profile Edit Page
      } else if (loginData.role === "organizer") {
        window.location.href = "organizer-dashboard.html"; // Organizer Dashboard
      }
    } else {
      alert("Login failed after signup. Please try logging in manually.");
    }
  } else {
    alert(data.message);
  }
});
