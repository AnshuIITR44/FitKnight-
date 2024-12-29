async function loadBuddies() {
    const response = await fetch("https://fitknight-01ae.onrender.com/buddies");
    const buddies = await response.json();
    const buddyList = document.getElementById("buddy-list");

    buddies.forEach((buddy) => {
        const div = document.createElement("div");
        div.innerHTML = `<h3>${buddy.username}</h3><p>${buddy.fitnessGoals}</p>`;  // Fixed string interpolation
        buddyList.appendChild(div);
    });
}

async function loadGroups() {
    const response = await fetch("https://fitknight-01ae.onrender.com/groups");
    const groups = await response.json();
    const groupList = document.getElementById("group-list");

    groups.forEach((group) => {
        const div = document.createElement("div");
        div.innerHTML = `<h3>${group.name}</h3><p>${group.activityType}</p>`;  // Fixed string interpolation
        groupList.appendChild(div);
    });
}

loadBuddies();
loadGroups();
