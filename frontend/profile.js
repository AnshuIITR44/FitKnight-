document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You are not logged in!");
    window.location.href = "index.html";
    return;
  }

  // Fetch profile data
  try {
    const response = await fetch("https://fitknight-01ae.onrender.com/buddies/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Failed to load profile.");
    }

    const user = await response.json();

    // Populate profile fields
    document.getElementById("profile-picture").src = user.profilePicture || "default-profile.png";
    document.getElementById("name").textContent = user.name || "Not set";
    document.getElementById("about").textContent = user.about || "Not set";
    document.getElementById("fitness-goals").textContent = user.fitnessGoals || "Not set";

    // Populate fitness history
    const historyList = document.getElementById("history-list");
    historyList.innerHTML = ""; // Clear loading text
    user.fitnessHistory.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      historyList.appendChild(li);
    });

    // Populate contact details
    document.getElementById("phone").textContent = user.privacySettings ? user.phone : "Hidden";
    document.getElementById("email").textContent = user.privacySettings ? user.email : "Hidden";
    document.getElementById("privacy-settings").checked = user.privacySettings;
  } catch (error) {
    console.error("Error loading profile:", error);
    alert("Failed to load profile.");
  }

  // Edit profile logic
  document.getElementById("edit-profile-btn").addEventListener("click", () => {
    document.getElementById("edit-profile-form").style.display = "block";
    document.getElementById("new-name").value = document.getElementById("name").textContent;
    document.getElementById("new-about").value = document.getElementById("about").textContent;
    document.getElementById("new-fitness-goals").value = document.getElementById("fitness-goals").textContent;
  });

  document.getElementById("save-profile-btn").addEventListener("click", async () => {
    const updatedName = document.getElementById("new-name").value;
    const updatedAbout = document.getElementById("new-about").value;
    const updatedFitnessGoals = document.getElementById("new-fitness-goals").value;

    try {
      const updateResponse = await fetch("https://fitknight-01ae.onrender.com/buddies/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: updatedName,
          about: updatedAbout,
          fitnessGoals: updatedFitnessGoals,
        }),
      });

      const updateData = await updateResponse.json();

      if (updateData.success) {
        alert("Profile updated successfully!");
        window.location.reload();
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  });

  // Privacy settings toggle
  document.getElementById("privacy-settings").addEventListener("change", async (event) => {
    const privacySettings = event.target.checked;

    try {
      const privacyResponse = await fetch("https://fitknight-01ae.onrender.com/buddies/privacy", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ privacySettings }),
      });

      if (!privacyResponse.ok) {
        throw new Error("Failed to update privacy settings.");
      }

      alert("Privacy settings updated successfully!");
    } catch (error) {
      console.error("Error updating privacy settings:", error);
      alert("Failed to update privacy settings.");
    }
  });
});
