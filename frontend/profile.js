document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You are not logged in!");
    window.location.href = "index.html"; // Redirect to login page
    return;
  }

  // Function to fetch and display user profile
  async function fetchProfile() {
    const response = await fetch("https://fitknight-01ae.onrender.com/users", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = await response.json();

    if (!user || user.error) {
      alert("Failed to fetch user profile.");
      return;
    }

    // Display the user's profile details
    document.getElementById("username").textContent = user.username || "Not Available";
    document.getElementById("fitness-goals").textContent = user.fitnessGoals || "Not set";
    document.getElementById("preferences").textContent = user.workoutPreferences || "Not set";
    document.getElementById("availability").textContent = user.availability || "Not set";
  }

  // Call fetchProfile to display the profile initially
  await fetchProfile();

  // Handle Edit Profile
  document.getElementById("edit-profile-btn").addEventListener("click", () => {
    document.getElementById("profile-info").style.display = "none";
    document.getElementById("edit-profile").style.display = "block";
  });

  // Handle Profile Update
  document.getElementById("edit-profile-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const newGoals = document.getElementById("new-goals").value;
    const newPreferences = document.getElementById("new-preferences").value;
    const newAvailability = document.getElementById("new-availability").value;

    const updateResponse = await fetch("https://fitknight-01ae.onrender.com/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token
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

      // Fetch updated profile details and refresh the page display
      await fetchProfile();

      // Switch back to display mode
      document.getElementById("profile-info").style.display = "block";
      document.getElementById("edit-profile").style.display = "none";
    } else {
      alert("Failed to update profile: " + data.message);
    }
  });
});
