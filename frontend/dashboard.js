async function loadBuddies() {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage
  const response = await fetch("https://fitknight-01ae.onrender.com/buddies", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const buddies = await response.json();
  const buddyList = document.getElementById("buddy-list");

  buddies.forEach((buddy) => {
    const div = document.createElement("div");
    div.innerHTML = `<h3>${buddy.username}</h3><p>${buddy.fitnessGoals}</p>`;
    buddyList.appendChild(div);
  });
}

async function loadGroups() {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage
  const response = await fetch("https://fitknight-01ae.onrender.com/groups", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const groups = await response.json();
  const groupList = document.getElementById("group-list");

  groups.forEach((group) => {
    const div = document.createElement("div");
    div.innerHTML = `<h3>${group.name}</h3><p>${group.activityType}</p>`;
    groupList.appendChild(div);
  });
}

loadBuddies();
loadGroups();
