document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You are not logged in!");
    window.location.href = "index.html";
    return;
  }

  // Fetch user details
  const response = await fetch("https://fitknight-01ae.onrender.com/users/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const user = await response.json();

  if (user.error) {
    alert("Failed to load profile.");
    return;
  }

  // Display user details
  document.getElementById("username").textContent = user.username;
  document.getElementById("fitness-goals").textContent = user.fitnessGoals || "Not set";
  document.getElementById("preferences").textContent = user.preferences || "Not set";
  document.getElementById("availability").textContent = user.availability || "Not set";

  // Edit profile
  const editBtn = document.getElementById("edit-profile-btn");
  const editForm = document.getElementById("edit-profile-form");
  const profileInfo = document.getElementById("profile-info");

  editBtn.addEventListener("click", () => {
    editForm.style.display = "block";
    profileInfo.style.display = "none";

    document.getElementById("new-goals").value = user.fitnessGoals || "";
    document.getElementById("new-preferences").value = user.preferences || "";
    document.getElementById("new-availability").value = user.availability || "";
  });

  // Save profile
  const saveBtn = document.getElementById("save-profile-btn");
  saveBtn.addEventListener("click", async () => {
    const updatedGoals = document.getElementById("new-goals").value;
    const updatedPreferences = document.getElementById("new-preferences").value;
    const updatedAvailability = document.getElementById("new-availability").value;

    const updateResponse = await fetch("https://fitknight-01ae.onrender.com/users/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fitnessGoals: updatedGoals,
        preferences: updatedPreferences,
        availability: updatedAvailability,
      }),
    });

    const updateData = await updateResponse.json();

    if (updateData.success) {
      alert("Profile updated successfully!");
      window.location.reload();
    } else {
      alert("Failed to update profile.");
    }
  });
});
