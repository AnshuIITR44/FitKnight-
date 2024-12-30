document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;
  const role = document.getElementById("signup-role").value;

  const response = await fetch("https://fitknight-01ae.onrender.com/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, role }),
  });

  const data = await response.json();
  if (data.success) {
    alert(data.message);

    if (role === "organizer") {
      window.location.href = "group.html"; // Redirect to group creation page
    } else {
      window.location.href = "dashboard.html";
    }
  } else {
    alert(data.message);
  }
});
