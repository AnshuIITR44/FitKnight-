const token = localStorage.getItem("token"); // Retrieve token from local storage

async function fetchProfile() {
  const response = await fetch("https://fitknight-01ae.onrender.com/users", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const user = await response.json();
  console.log("Fetched Profile:", user); // Log fetched profile data

  if (!user || user.error) {
    alert("Failed to fetch user profile.");
    return;
  }

  // Display user data on the profile page
  document.getElementById("username").textContent = user.username || "Not Available";
  document.getElementById("fitness-goals").textContent = user.fitnessGoals || "Not set";
  document.getElementById("preferences").textContent = user.workoutPreferences || "Not set";
  document.getElementById("availability").textContent = user.availability || "Not set";
}

// Handle profile update
document.getElementById("edit-profile-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const newGoals = document.getElementById("new-goals").value;
  const newPreferences = document.getElementById("new-preferences").value;
  const newAvailability = document.getElementById("new-availability").value;

  console.log("Submitting Profile Update:", { newGoals, newPreferences, newAvailability }); // Log submitted data

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
  console.log("Update Response:", data); // Log API response

  if (data.success) {
    alert("Profile updated successfully!");
    await fetchProfile(); // Fetch updated details after a successful update
  } else {
    alert("Failed to update profile: " + data.message);
  }
});

// Fetch and display profile details on page load
fetchProfile();
