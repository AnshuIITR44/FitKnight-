document.addEventListener("DOMContentLoaded", async () => {
    const groupId = "GROUP_ID_HERE"; // Replace with the actual group ID.
  
    // Fetch group details
    const response = await fetch(`http://localhost:3000/groups/${groupId}`);
    const group = await response.json();
  
    document.getElementById("group-name").textContent = group.name;
    document.getElementById("activity-type").textContent = group.activityType;
    document.getElementById("location").textContent = group.location;
    document.getElementById("schedule").textContent = group.schedule;
  
    // Load members
    const memberList = document.getElementById("member-list");
    group.members.forEach((member) => {
      const li = document.createElement("li");
      li.textContent = member.username;
      memberList.appendChild(li);
    });
  
    // Join group
    document.getElementById("join-group-btn").addEventListener("click", async () => {
      const userId = "USER_ID_HERE"; // Replace with logged-in user ID.
      const joinResponse = await fetch("http://localhost:3000/groups/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupId, userId }),
      });
  
      const data = await joinResponse.json();
      alert(data.message);
    });
  
    // Chat functionality (using WebSocket)
    const socket = io("http://localhost:3000");
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
  });
  