document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You are not logged in!");
    window.location.href = "index.html";
    return;
  }

  document.getElementById("group-create-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validate form fields
    const groupName = document.getElementById("group-name").value.trim();
    const groupActivities = document.getElementById("group-activities").value.trim();

    if (!groupName || !groupActivities) {
      alert("Group name and activities are required!");
      return;
    }

    const formData = new FormData();
    formData.append("groupName", groupName); // Group Name
    formData.append("organizerPicture", document.getElementById("organizer-picture").files[0]); // Profile Picture
    formData.append("groupActivities", groupActivities); // Group Activities
    formData.append("dailyGoals", document.getElementById("daily-goals").value); // Daily Goals
    formData.append("phone", document.getElementById("phone").value); // Phone
    formData.append("phoneVisibility", document.getElementById("phone-visibility").checked); // Phone Visibility
    formData.append("email", document.getElementById("email").value); // Email
    formData.append("emailVisibility", document.getElementById("email-visibility").checked); // Email Visibility

    try {
      const response = await fetch("https://fitknight-01ae.onrender.com/groups", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Group created successfully!");
        // Redirect to Group Page with the newly created group's ID
        window.location.href = `group-page.html?id=${result.group._id}`;
      } else {
        alert("Failed to create group: " + result.message);
      }
    } catch (error) {
      console.error("Error creating group:", error);
      alert("An error occurred while creating the group.");
    }
  });
});
