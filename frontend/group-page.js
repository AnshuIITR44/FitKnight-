document.addEventListener("DOMContentLoaded", async () => {
  const groupId = new URLSearchParams(window.location.search).get("id"); // Get group ID from URL
  const token = localStorage.getItem("token");

  if (!groupId || !token) {
    alert("Missing group ID or user authentication!");
    window.location.href = "organizer-dashboard.html";
    return;
  }

  // Fetch group details
  const fetchGroupDetails = async () => {
    const response = await fetch(`https://fitknight-01ae.onrender.com/groups/${groupId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const group = await response.json();

    document.getElementById("group-name").textContent = group.name;
    document.getElementById("activity-type").textContent = group.activityType;
    document.getElementById("schedule").textContent = group.schedule;
    document.getElementById("location").textContent = group.location;
    document.getElementById("description").textContent = group.description;

    document.getElementById("organizer-name").textContent = group.organizer.name;
    document.getElementById("organizer-email").textContent = group.organizer.email;
    document.getElementById("organizer-phone").textContent = group.organizer.phone;

    // Populate members list
    const memberList = document.getElementById("member-list");
    group.members.forEach((member) => {
      const li = document.createElement("li");
      li.textContent = `${member.name} - ${member.email}`;
      memberList.appendChild(li);
    });
  };

  // Handle join group request
  document.getElementById("join-group-btn").addEventListener("click", async () => {
    const response = await fetch("https://fitknight-01ae.onrender.com/groups/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ groupId }),
    });
    const data = await response.json();
    alert(data.message);
  });

  // Group chat functionality using WebSocket
  const socket = io("https://fitknight-01ae.onrender.com"); // WebSocket connection
  const chatBox = document.getElementById("chat-box");

  socket.on("chat message", (msg) => {
    const div = document.createElement("div");
    div.textContent = msg;
    chatBox.appendChild(div);
  });

  document.getElementById("send-chat-btn").addEventListener("click", () => {
    const chatInput = document.getElementById("chat-input");
    socket.emit("chat message", chatInput.value);
    chatInput.value = "";
  });

  // Fetch group details on page load
  fetchGroupDetails();
});
