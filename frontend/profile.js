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
      const errorData = await response.json();
      console.error("Error response from server:", errorData);
      alert("Failed to load profile. " + (errorData.error || "Please try again."));
      return;
    }

    const user = await response.json();

    document.getElementById("username").textContent = user.username;
    document.getElementById("fitness-goals").textContent = user.fitnessGoals || "Not set";
    document.getElementById("preferences").textContent = user.preferences || "Not set";
    document.getElementById("availability").textContent = user.availability || "Not set";
  } catch (error) {
    console.error("Network or parsing error:", error);
    alert("Failed to load profile. Please check your connection and try again.");
  }
});
