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

      // Construct profile picture URL or fallback to default
      const profilePictureSrc = user.profilePicture
        ? `https://fitknight-01ae.onrender.com/uploads/${user.profilePicture}`
        : `https://fitknight-01ae.onrender.com/uploads/default-profile.jpg`;

      // Set profile picture and other details
      document.getElementById("profile-picture").src = profilePictureSrc;
      document.getElementById("username").innerText = user.username;
      document.getElementById("fitness-goals").innerText = user.fitnessGoals || "Not set";
      document.getElementById("workout-preferences").innerText =
        user.workoutPreferences || "Not set";
      document.getElementById("availability").innerText = user.availability || "Not set";
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
