document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  // Fetch existing groups for the organizer
  const response = await fetch("https://fitknight-01ae.onrender.com/groups", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const groups = await response.json();
  const groupList = document.getElementById("group-list");

  groups.forEach((group) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${group.name}</h3>
      <p><strong>Activity Type:</strong> ${group.activityType}</p>
      <p><strong>Location:</strong> ${group.location}</p>
      <p><strong>Schedule:</strong> ${group.schedule}</p>
    `;
    groupList.appendChild(div);
  });

  // Handle group creation
  document.getElementById("create-group-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const groupName = document.getElementById("group-name").value;
    const activityType = document.getElementById("activity-type").value;
    const location = document.getElementById("location").value;
    const schedule = document.getElementById("schedule").value;

    const createResponse = await fetch("https://fitknight-01ae.onrender.com/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: groupName, activityType, location, schedule }),
    });

    const data = await createResponse.json();
    if (data.success) {
      alert("Group created successfully!");
      window.location.reload(); // Reload the page to see the updated group list
    } else {
      alert("Failed to create group: " + data.message);
    }
  });
});
