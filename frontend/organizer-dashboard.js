document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  // Fetch and display groups
  const fetchGroups = async () => {
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
        <button onclick="editGroup('${group._id}')">Edit</button>
      `;
      groupList.appendChild(div);
    });
  };

  // Edit group details
  const editGroup = async (groupId) => {
    const newDetails = prompt("Enter new details (Activity Type, Location, Schedule):");
    if (newDetails) {
      const [activityType, location, schedule] = newDetails.split(",").map((str) => str.trim());
      await fetch(`https://fitknight-01ae.onrender.com/groups/${groupId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ activityType, location, schedule }),
      });
      alert("Group updated successfully!");
      window.location.reload();
    }
  };

  // Fetch and display join requests
  const fetchJoinRequests = async () => {
    const response = await fetch("https://fitknight-01ae.onrender.com/groups/requests", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const requests = await response.json();
    const joinRequests = document.getElementById("join-requests");

    requests.forEach((request) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p><strong>${request.username}</strong> wants to join <strong>${request.groupName}</strong>.</p>
        <button onclick="handleRequest('${request._id}', true)">Approve</button>
        <button onclick="handleRequest('${request._id}', false)">Reject</button>
      `;
      joinRequests.appendChild(div);
    });
  };

  // Handle join requests
  const handleRequest = async (requestId, approve) => {
    await fetch(`https://fitknight-01ae.onrender.com/groups/requests/${requestId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ approve }),
    });
    alert(`Request ${approve ? "approved" : "rejected"} successfully!`);
    window.location.reload();
  };

  // Search for buddies
  document.getElementById("buddy-search-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const proximity = document.getElementById("proximity").value;
    const availability = document.getElementById("availability").value;

    const response = await fetch("https://fitknight-01ae.onrender.com/buddies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ proximity, availability }),
    });

    const buddies = await response.json();
    const buddyResults = document.getElementById("buddy-results");
    buddyResults.innerHTML = ""; // Clear previous results

    buddies.forEach((buddy) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p><strong>Name:</strong> ${buddy.name}</p>
        <p><strong>Hobby:</strong> ${buddy.hobby}</p>
