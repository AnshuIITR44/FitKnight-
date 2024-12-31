document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("https://fitknight-01ae.onrender.com/users", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.ok) {
    const user = await response.json();
    document.getElementById("fitness-goals").value = user.fitnessGoals || "";
    document.getElementById("workout-preferences").value = user.workoutPreferences || "";
    document.getElementById("availability").value = user.availability || "";
  } else {
    alert("Failed to fetch profile details.");
  }

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
      window.location.href = "profile.html"; // Redirect to profile.html
    } else {
      alert("Failed to update profile: " + updateData.message);
    }
  });
});
