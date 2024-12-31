// buddy-dashboard.js

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  // Fetch recommended buddies
  try {
    const response = await fetch("https://fitknight-01ae.onrender.com/buddies", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const buddies = await response.json();
      const buddyList = document.getElementById("buddy-list");
      buddyList.innerHTML = ""; // Clear loading message

      buddies.forEach((buddy) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <h3>${buddy.name}</h3>
          <p><strong>Age:</strong> ${buddy.age}</p>
          <p><strong>Hobby:</strong> ${buddy.hobby}</p>
          <p><strong>Goals:</strong> ${buddy.fitnessGoals}</p>
        `;
        buddyList.appendChild(div);
      });
    } else {
      console.error("Failed to fetch buddies.");
      alert("Unable to load recommended buddies. Please try again later.");
    }
  } catch (error) {
    console.error("Error fetching buddies:", error);
    alert("An error occurred while fetching recommended buddies.");
  }
});
