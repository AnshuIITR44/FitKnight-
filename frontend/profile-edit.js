document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  // Fetch current profile details
  const response = await fetch("https://fitknight-01ae.onrender.com/users", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const user = await response.json();
  document.getElementById("fitness-goals").value = user.fitnessGoals || "";
  document.getElementById("workout-preferences").value = user.workoutPreferences || "";
  document.getElementById("availability").value = user.availability || "";

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
      window.location.href = "buddy-dashboard.html";
    } else {
      alert("Failed to update profile: " + updateData.message);
    }
  });
});
