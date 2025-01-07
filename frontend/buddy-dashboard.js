document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  // Fetch buddies and groups based on filters
  const fetchData = async (filters = {}) => {
    try {
      // Fetch buddies
      const buddyResponse = await fetch("https://fitknight-01ae.onrender.com/buddies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(filters),
      });
      const buddies = await buddyResponse.json();

      // Update buddy list
      const buddyList = document.getElementById("buddy-list");
      buddyList.innerHTML = "";
      buddies.forEach((buddy) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
          <h3>${buddy.name}</h3>
          <p><strong>Age:</strong> ${buddy.age}</p>
          <p><strong>Hobby:</strong> ${buddy.hobby}</p>
          <p><strong>Goals:</strong> ${buddy.fitnessGoals}</p>
        `;
        buddyList.appendChild(div);
      });

      // Fetch groups
      const groupResponse = await fetch("https://fitknight-01ae.onrender.com/groups");
      const groups = await groupResponse.json();

      // Update group list
      const groupList = document.getElementById("group-list");
      groupList.innerHTML = "";
      groups.forEach((group) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
          <h3>${group.name}</h3>
          <p><strong>Activity Type:</strong> ${group.activityType}</p>
          <p><strong>Location:</strong> ${group.location}</p>
          <button onclick="location.href='group.html?id=${group._id}'">View Group</button>
        `;
        groupList.appendChild(div);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Initial fetch
  fetchData();

  // Handle filter form submission
  document.getElementById("filter-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const filters = {
      activityType: document.getElementById("activity-type").value,
      skillLevel: document.getElementById("skill-level").value,
      location: document.getElementById("location").value,
    };
    fetchData(filters);
  });
});
