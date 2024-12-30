const token = localStorage.getItem("token"); // Retrieve token from local storage

// Fetch user profile
async function fetchProfile() {
  const response = await fetch("https://fitknight-01ae.onrender.com/users", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const user = await response.json();

  if (!user || user.error) {
    alert("Failed to fetch user profile.");
    return;
  }

  // Display user data on the profile page
  document.getElementById("username").textContent = user.username || "Not set";
  document.getElementById("fitness-goals").textContent = user.fitnessGoals || "Not set";
  document.getElementById("preferences").textContent = user.workoutPreferences || "Not set";
  document.getElementById("availability").textContent = user.availability || "Not set";
}

// Toggle edit profile form visibility
document.getElementById("edit-profile").addEventListener("click", () => {
  document.getElementById("edit-profile-form").classList.toggle("hidden");
});

// Save profile updates
document.getElementById("save-profile").addEventListener("click", async () => {
  const newGoals = document.getElementById("new-goals").value;
  const newPreferences = document.getElementById("new-preferences").value;
  const newAvailability = document.getElementById("new-availability").value;

  const updateResponse = await fetch("https://fitknight-01ae.onrender.com/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
    document.getElementById("edit-profile-form").classList.add("hidden");
    fetchProfile(); // Refresh profile data
  } else {
    alert("Failed to update profile: " + data.message);
  }
});

// Fetch profile data on page load
fetchProfile();
