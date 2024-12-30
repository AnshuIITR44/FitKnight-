document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You are not logged in!");
    window.location.href = "index.html"; // Redirect to login page
    return;
  }

  // Fetch profile details
  const response = await fetch("https://fitknight-01ae.onrender.com/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
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

    const updateResponse = await fetch("https://fitknight-01ae.onrender.com/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the request
      },
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
