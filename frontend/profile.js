document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You are not logged in!");
    window.location.href = "index.html";
    return;
  }

  // Fetch user profile
  const response = await fetch("https://fitknight-01ae.onrender.com/users", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.ok) {
    const user = await response.json();
    document.getElementById("username").textContent = user.username;
    document.getElementById("fitness-goals").textContent = user.fitnessGoals || "Not set";
    document.getElementById("preferences").textContent = user.workoutPreferences || "Not set";
    document.getElementById("availability").textContent = user.availability || "Not set";
  } else {
    alert("Failed to fetch profile details.");
  }

  // Show edit form on button click
  document.getElementById("edit-profile-btn").addEventListener("click", () => {
    document.getElementById("profile-info").style.display = "none";
    document.getElementById("edit-profile").style.display = "block";
  });
});
