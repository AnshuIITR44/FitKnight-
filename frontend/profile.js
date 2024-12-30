document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You are not logged in!");
    window.location.href = "index.html";
    return;
  }

  try {
    const response = await fetch("https://fitknight-01ae.onrender.com/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile data.");
    }

    const user = await response.json();

    document.getElementById("username").textContent = user.username;
    document.getElementById("fitness-goals").textContent = user.fitnessGoals || "Not set";
    document.getElementById("preferences").textContent = user.preferences || "Not set";
    document.getElementById("availability").textContent = user.availability || "Not set";
  } catch (error) {
    console.error("Error loading profile:", error);
    alert("Failed to load profile. Please try again.");
  }
});
