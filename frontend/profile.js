document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You are not logged in!");
    window.location.href = "index.html";
    return;
  }

  const profileView = document.getElementById("profile-view");
  const profileEdit = document.getElementById("profile-edit");

  // Fetch profile
  try {
    const response = await fetch("https://fitknight-01ae.onrender.com/buddies/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Failed to load profile.");
    }

    const user = await response.json();

    document.getElementById("profile-picture").src = user.profilePicture || "default-profile.png";
    document.getElementById("name").textContent = user.name || "Not set";
    document.getElementById("about").textContent = user.about || "Not set";
    document.getElementById("fitness-goals").textContent = user.fitnessGoals || "Not set";
    document.getElementById("phone").textContent = user.privacySettings ? user.phone : "Hidden";
    document.getElementById("email").textContent = user.privacySettings ? user.email : "Hidden";
    document.getElementById("privacy-settings").checked = user.privacySettings;
  } catch (error) {
    console.error("Error fetching profile:", error);
    alert("Failed to load profile.");
  }

  // Edit profile
  document.getElementById("edit-profile-btn").addEventListener("click", () => {
    profileView.classList.add("hidden");
    profileEdit.classList.remove("hidden");

    document.getElementById("edit-name").value = document.getElementById("name").textContent;
    document.getElementById("edit-about").value = document.getElementById("about").textContent;
    document.getElementById("edit-goals").value = document.getElementById("fitness-goals").textContent;
  });

  document.getElementById("cancel-edit-btn").addEventListener("click", () => {
    profileView.classList.remove("hidden");
    profileEdit.classList.add("hidden");
  });

  document.getElementById("save-profile-btn").addEventListener("click", async () => {
    const updatedName = document.getElementById("edit-name").value;
    const updatedAbout = document.getElementById("edit-about").value;
    const updatedGoals = document.getElementById("edit-goals").value;

    try {
      const response = await fetch("https://fitknight-01ae.onrender.com/buddies/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: updatedName,
          about: updatedAbout,
          fitnessGoals: updatedGoals,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save profile.");
      }

      alert("Profile updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile.");
    }
  });

  // Privacy settings
  document.getElementById("privacy-settings").addEventListener("change", async (event) => {
    try {
      const privacyResponse = await fetch("https://fitknight-01ae.onrender.com/buddies/privacy", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ privacySettings: event.target.checked }),
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
