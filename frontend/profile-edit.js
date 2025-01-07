document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  try {
    // Fetch existing profile data
    const response = await fetch("https://fitknight-01ae.onrender.com/users", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const user = await response.json();

      // Populate existing fields
      document.getElementById("fitness-goals").value = user.fitnessGoals || "";
      document.getElementById("workout-preferences").value = user.workoutPreferences || "";
      document.getElementById("availability").value = user.availability || "";

      // Populate new fields
      document.getElementById("about").value = user.about || "";
      document.getElementById("fitness-history").value = user.fitnessHistory?.join(", ") || "";
      document.getElementById("phone").value = user.phone || "";
      document.getElementById("email").value = user.email || "";
      document.getElementById("phone-visibility").checked = user.contactVisibility?.phone || false;
      document.getElementById("email-visibility").checked = user.contactVisibility?.email || false;
    } else {
      alert("Failed to fetch profile details for editing.");
    }
  } catch (error) {
    console.error("Error fetching profile details:", error);
    alert("An error occurred while fetching profile details.");
  }

  // Handle profile update form submission
  document.getElementById("profile-edit-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedProfile = {
      fitnessGoals: document.getElementById("fitness-goals").value,
      workoutPreferences: document.getElementById("workout-preferences").value,
      availability: document.getElementById("availability").value,
      about: document.getElementById("about").value,
      fitnessHistory: document.getElementById("fitness-history").value.split(",").map((item) => item.trim()),
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      contactVisibility: {
        phone: document.getElementById("phone-visibility").checked,
        email: document.getElementById("email-visibility").checked,
      },
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
        window.location.href = "profile.html"; // Redirect to profile page
      } else {
        alert("Failed to update profile: " + updateData.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  });
});
