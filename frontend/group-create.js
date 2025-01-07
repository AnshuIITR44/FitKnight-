document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You are not logged in!");
    window.location.href = "index.html";
    return;
  }

  document.getElementById("group-create-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("organizerName", document.getElementById("organizer-name").value);
    formData.append("organizerPicture", document.getElementById("organizer-picture").files[0]);
    formData.append("groupActivities", document.getElementById("group-activities").value);
    formData.append("dailyGoals", document.getElementById("daily-goals").value);
    formData.append("phone", document.getElementById("phone").value);
    formData.append("phoneVisibility", document.getElementById("phone-visibility").checked);
    formData.append("email", document.getElementById("email").value);
    formData.append("emailVisibility", document.getElementById("email-visibility").checked);

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
        window.location.href = "organizer-dashboard.html";
      } else {
        alert("Failed to create group: " + result.message);
      }
    } catch (error) {
      console.error("Error creating group:", error);
      alert("An error occurred while creating the group.");
    }
  });
});
