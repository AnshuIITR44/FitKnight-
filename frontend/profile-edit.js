document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("https://fitknight-01ae.onrender.com/users", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const user = await response.json();
      document.getElementById("fitness-goals").value = user.fitnessGoals || "";
      document.getElementById("workout-preferences").value = user.workoutPreferences || "";
      document.getElementById("availability").value = user.availability || "";
    } else {
      alert("Failed to fetch profile details for editing.");
    }
  } catch (error) {
    console.error("Error fetching profile details:", error);
    alert("An error occurred while fetching profile details.");
  }

  document.getElementById("profile-edit-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedProfile = {
      fitnessGoals: document.getElementById("fitness-goals").value,
      workoutPreferences: document.getElementById("workout-preferences").value,
      availability: document.getElementById("availability").value,
    };

    try {
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
        window.location.href = "profile.html"; // Reload profile page
      } else {
        alert("Failed to update profile: " + updateData.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  });
});
