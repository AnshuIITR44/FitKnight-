document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
  
    const response = await fetch("https://fitknight-01ae.onrender.com/auth/login", {  // Updated URL
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await response.json();
    alert(data.message);
});
  
document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    const role = document.getElementById("signup-role").value;
  
    const response = await fetch("https://fitknight-01ae.onrender.com/auth/signup", {  // Updated URL
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role }),
    });
  
    const data = await response.json();
    alert(data.message);
});
