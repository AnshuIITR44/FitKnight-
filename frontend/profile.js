document.addEventListener("DOMContentLoaded", async () => {
  const userId = "USER_ID_HERE"; // Replace with logged-in user ID retrieved from token or session.

  // Fetch profile details
  const response = await fetch(`https://fitknight-01ae.onrender.com/users/${userId}`);
  const user = await response.json();

  document.getElementById("username").textContent = user.username;
  document.getElementById("fitness-goals").textContent = user.fitnessGoals || "Not set";
  document.getElementById("preferences").textContent = user.workoutPreferences || "Not set";
  document.getElementById("availability").textContent = user.availability || "Not set";

  // Edit profile
  document.getElementById("edit-profile-btn").addEventListener("click", () => {
    document.getElementById("profile-info").style.display = "none";
    document.getElementById("edit-profile").style.display = "block";
  });

  document.getElementById("edit-profile-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const newGoals = document.getElementById("new-goals").value;
    const newPreferences = document.getElementById("new-preferences").value;
    const newAvailability = document.getElementById("new-availability").value;

    const updateResponse = await fetch(`https://fitknight-01ae.onrender.com/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fitnessGoals: newGoals,
        workoutPreferences: newPreferences,
        availability: newAvailability,
      }),
    });

    const data = await updateResponse.json();
    if (data.success) {
      alert("Profile updated successfully!");
      window.location.reload();
    } else {
      alert("Failed to update profile: " + data.message);
    }
  });
});
