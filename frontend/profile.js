document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You are not logged in!");
    window.location.href = "index.html";
    return;
  }

  try {
    // Fetch user details from the server
    const response = await fetch("https://fitknight-01ae.onrender.com/users", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const user = await response.json();

      // Update profile details
      document.getElementById("profile-picture").src = `uploads/${user.profilePicture}`;
      document.getElementById("name").innerText = user.name || "Not set";
      document.getElementById("about").innerText = user.about || "Not set";
      document.getElementById("fitness-goals").innerText = user.fitnessGoals || "Not set";

      // Update fitness history
      const fitnessHistory = user.fitnessHistory || [];
      const historyList = document.getElementById("fitness-history");
      historyList.innerHTML = fitnessHistory.length
        ? fitnessHistory.map((item) => `<li>${item}</li>`).join("")
        : "<li>No fitness milestones yet.</li>";

      // Update contact details
      document.getElementById("phone").innerText = user.phone || "Not set";
      document.getElementById("email").innerText = user.email || "Not set";
      document.getElementById("phone-visibility").checked = user.contactVisibility?.phone || false;
      document.getElementById("email-visibility").checked = user.contactVisibility?.email || false;
    } else {
      alert("Failed to fetch profile details.");
    }
  } catch (error) {
    console.error("Error fetching profile details:", error);
    alert("An error occurred while fetching profile details.");
  }

  // Redirect to edit profile page
  document.getElementById("edit-profile-btn").addEventListener("click", () => {
    window.location.href = "profile-edit.html";
  });
});
