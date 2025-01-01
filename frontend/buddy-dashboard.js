document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  // Fetch recommended buddies
  const response = await fetch("https://fitknight-01ae.onrender.com/buddies", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const buddies = await response.json();
  const buddyList = document.getElementById("buddy-list");

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
});
