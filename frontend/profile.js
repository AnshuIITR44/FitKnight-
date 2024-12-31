document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You are not logged in!");
    window.location.href = "index.html";
    return;
  }

  try {
    const response = await fetch("https://fitknight-01ae.onrender.com/users", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const user = await response.json();

      // Profile Picture
      document.getElementById("profile-picture").src = `/uploads/${user.profilePicture}`;
      document.getElementById("username").innerText = user.username || "Not set";
      document.getElementById("fitness-goals").innerText = user.fitnessGoals || "Not set";
      document.getElementById("workout-preferences").innerText = user.workoutPreferences || "Not set";
      document.getElementById("availability").innerText = user.availability || "Not set";

      // Fitness History
      document.getElementById("fitness-history").innerText = user.fitnessHistory || "No activities logged yet";

      // Contact Details with Visibility Logic
      const phoneSection = document.getElementById("phone-section");
      const emailSection = document.getElementById("email-section");

      if (user.contactDetails?.showPhone) {
        document.getElementById("phone").innerText = user.contactDetails.phone || "Not provided";
      } else {
        phoneSection.style.display = "none"; // Hide phone section if not visible
      }

      if (user.contactDetails?.showEmail) {
        document.getElementById("email").innerText = user.contactDetails.email || "Not provided";
      } else {
        emailSection.style.display = "none"; // Hide email section if not visible
      }
    } else {
      alert("Failed to fetch profile details.");
    }
  } catch (error) {
    console.error("Error fetching profile details:", error);
    alert("An error occurred while fetching profile details.");
  }

  document.getElementById("edit-profile-btn").addEventListener("click", () => {
    window.location.href = "profile-edit.html";
  });
});
