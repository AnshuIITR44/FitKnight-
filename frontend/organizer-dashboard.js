document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You are not logged in!");
    window.location.href = "index.html";
    return;
  }

  // Fetch and Display Created Groups
  const loadCreatedGroups = async () => {
    const response = await fetch("/groups/created", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    const groupsContainer = document.getElementById("created-groups");
    groupsContainer.innerHTML = "";

    if (data.success) {
      data.groups.forEach((group) => {
        const div = document.createElement("div");
        div.className = "group";
        div.innerHTML = `
          <h3>${group.name}</h3>
          <p>Activity: ${group.activityType}</p>
          <p>Schedule: ${group.schedule}</p>
          <button onclick="editGroup('${group._id}')">Edit</button>
          <button onclick="deleteGroup('${group._id}')">Delete</button>
        `;
        groupsContainer.appendChild(div);
      });
    } else {
      groupsContainer.innerHTML = `<p>${data.message || "Failed to load groups."}</p>`;
    }
  };

  // Fetch and Display Join Requests
  const loadJoinRequests = async () => {
    const response = await fetch("/groups/requests", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    const requestsContainer = document.getElementById("join-requests");
    requestsContainer.innerHTML = "";

    if (data.success) {
      data.requests.forEach((request) => {
        const div = document.createElement("div");
        div.className = "request";
        div.innerHTML = `
          <p><strong>${request.username}</strong> wants to join ${request.groupName}</p>
          <button onclick="approveRequest('${request._id}')">Approve</button>
          <button onclick="rejectRequest('${request._id}')">Reject</button>
        `;
        requestsContainer.appendChild(div);
      });
    } else {
      requestsContainer.innerHTML = `<p>${data.message || "No join requests found."}</p>`;
    }
  };

  // Search Workout Buddies
  document.getElementById("buddy-search-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const proximity = document.getElementById("proximity").value;
    const availability = document.getElementById("availability").value;

    const response = await fetch(`/buddies/search?proximity=${proximity}&availability=${availability}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    const buddyList = document.getElementById("buddy-list");
    buddyList.innerHTML = "";

    if (data.success) {
      data.buddies.forEach((buddy) => {
        const li = document.createElement("li");
        li.textContent = `${buddy.username} - ${buddy.availability}`;
        buddyList.appendChild(li);
      });
    } else {
      buddyList.innerHTML = `<li>${data.message || "No buddies found."}</li>`;
    }
  });

  // Call functions to load data
  loadCreatedGroups();
  loadJoinRequests();
});

// Helper Functions
const editGroup = (groupId) => {
  // Redirect to the group editing page
  window.location.href = `/group/edit/${groupId}`;
};

const deleteGroup = async (groupId) => {
  const response = await fetch(`/groups/${groupId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  if (response.ok) {
    alert("Group deleted successfully.");
    window.location.reload();
  } else {
    alert("Failed to delete group.");
  }
};

const approveRequest = async (requestId) => {
  const response = await fetch(`/requests/${requestId}/approve`, {
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  if (response.ok) {
    alert("Request approved successfully.");
    window.location.reload();
  } else {
    alert("Failed to approve request.");
  }
};

const rejectRequest = async (requestId) => {
  const response = await fetch(`/requests/${requestId}/reject`, {
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  if (response.ok) {
    alert("Request rejected successfully.");
    window.location.reload();
  } else {
    alert("Failed to reject request.");
  }
};
