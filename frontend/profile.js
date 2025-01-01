document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You are not logged in!");
    window.location.href = "index.html"; // Redirect to login if token is missing
    return;
  }

  try {
    // Fetch user details from the server
    const response = await fetch("https://fitknight-01ae.onrender.com/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const user = await response.json();

      // Update the profile page with user data
      document.getElementById("profile-picture").src = `uploads/${user.profilePicture}`;
      document.getElementById("fitness-goals").innerText = user.roleDetails.fitnessGoals || "Not set";
      document.getElementById("workout-preferences").innerText = user.roleDetails.workoutPreferences || "Not set";
      document.getElementById("availability").innerText = user.roleDetails.availability || "Not set";

    } else {
      alert("Failed to fetch profile details. Please try again later.");
    }
  } catch (error) {
    console.error("Error fetching profile details:", error);
    alert("An error occurred while fetching profile details.");
  }

  // Redirect to edit profile page when 'Edit Profile' button is clicked
  document.getElementById("edit-profile-btn").addEventListener("click", () => {
    window.location.href = "profile-edit.html";
  });
});
