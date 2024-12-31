document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  // Redirect to login if token is missing
  if (!token) {
    alert("You are not logged in!");
    window.location.href = "index.html";
    return;
  }

  // Fetch user details
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
});
