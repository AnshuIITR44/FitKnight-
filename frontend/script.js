document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;
  const role = document.getElementById("signup-role").value;

  const signupData = { username, password, role };

  if (role === "organizer") {
    signupData.group = {
      name: document.getElementById("group-name").value,
      activityType: document.getElementById("activity-type").value,
      location: document.getElementById("location").value,
      schedule: document.getElementById("schedule").value,
    };
  }

  const response = await fetch("https://fitknight-01ae.onrender.com/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signupData),
  });

  const data = await response.json();
  if (data.success) {
    alert(data.message);

    if (role === "organizer") {
      window.location.href = "group.html"; // Redirect to group management page
    } else {
      window.location.href = "dashboard.html";
    }
  } else {
    alert(data.message);
  }
});
