document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  // Redirect to login if not authenticated
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

  // Handle "Edit Profile" button click
  document.getElementById("edit-profile-btn").addEventListener("click", () => {
    document.getElementById("profile-info").style.display = "none";
    document.getElementById("edit-profile").style.display = "block";
  });

  // Handle profile edit form submission
  document.getElementById("profile-edit-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedProfile = {
      fitnessGoals: document.getElementById("fitness-goals").value,
      workoutPreferences: document.getElementById("workout-preferences").value,
      availability: document.getElementById("availability").value,
    };

    const updateResponse = await fetch("https://fitknight-01ae.onrender.com/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedProfile),
    });

    const updateData = await updateResponse.json();
    if (updateData.success) {
      alert("Profile updated successfully!");
      window.location.href = "profile.html"; // Reload the profile page
    } else {
      alert("Failed to update profile: " + updateData.message);
    }
  });
});
