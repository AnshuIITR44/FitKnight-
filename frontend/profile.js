document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You are not logged in!");
    window.location.href = "index.html"; // Redirect to login if token is missing
    window.location.href = "index.html";
    return;
  }

  try {
    // Fetch user details from the server
    const response = await fetch("https://fitknight-01ae.onrender.com/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const user = await response.json();
      // Check if profilePicture exists, otherwise use a default image
      const profilePictureSrc = user.profilePicture
        ? `uploads/${user.profilePicture}`
        : "default-profile.png";

      // Update the profile page with user data
      document.getElementById("profile-picture").src = `uploads/${user.profilePicture}`;
      document.getElementById("fitness-goals").innerText = user.roleDetails.fitnessGoals || "Not set";
      document.getElementById("workout-preferences").innerText = user.roleDetails.workoutPreferences || "Not set";
      document.getElementById("availability").innerText = user.roleDetails.availability || "Not set";
      document.getElementById("profile-picture").src = profilePictureSrc;
      document.getElementById("username").innerText = user.username;
      document.getElementById("fitness-goals").innerText = user.fitnessGoals || "Not set";
      document.getElementById("workout-preferences").innerText = user.workoutPreferences || "Not set";
      document.getElementById("availability").innerText = user.availability || "Not set";
    } else {
      alert("Failed to fetch profile details. Please try again later.");
      alert("Failed to fetch profile details.");
    }
  } catch (error) {
    console.error("Error fetching profile details:", error);
    alert("An error occurred while fetching profile details.");
  }

  // Redirect to edit profile page when 'Edit Profile' button is clicked
  document.getElementById("edit-profile-btn").addEventListener("click", () => {
    window.location.href = "profile-edit.html";
  });
