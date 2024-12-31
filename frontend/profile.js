document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You are not logged in!");
    window.location.href = "index.html"; // Redirect to login if token is missing
    return;
  }

  try {
    const response = await fetch("https://fitknight-01ae.onrender.com/users", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const user = await response.json();

      // Update profile picture, username, and other details
      document.getElementById("profile-picture").src = `uploads/${user.profilePicture}`;
      document.getElementById("username").innerText = user.username || "Not set";
      document.getElementById("fitness-goals").innerText = user.fitnessGoals || "Not set";
      document.getElementById("workout-preferences").innerText = user.workoutPreferences || "Not set";
      document.getElementById("availability").innerText = user.availability || "Not set";
    } else {
      alert("Failed to fetch profile details. Please try again later.");
    }
  } catch (error) {
    console.error("Error fetching profile details:", error);
    alert("An error occurred while fetching profile details.");
  }

  document.getElementById("edit-profile-btn").addEventListener("click", () => {
    window.location.href = "profile-edit.html";
  });
});
