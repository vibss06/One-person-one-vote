// =============================
//  Candidate list (EDIT HERE)
// =============================
const candidates = ["Vibhanshu", "Raj", "Sneha", "Ananya"];

// Track current user
let currentUser = localStorage.getItem("currentUser");

// Ensure votes object exists
let votes = JSON.parse(localStorage.getItem("votes")) || {};
let userVotes = JSON.parse(localStorage.getItem("userVotes")) || {};

// Render candidates dynamically
const candidatesDiv = document.getElementById("candidates");
candidates.forEach(name => {
  const div = document.createElement("div");
  div.classList.add("candidate");
  div.innerHTML = `
    <span>${name}</span>
    <button class="vote-btn" data-candidate="${name}">Vote</button>
  `;
  candidatesDiv.appendChild(div);
});

// Handle voting
document.querySelectorAll(".vote-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const candidate = btn.dataset.candidate;

    if (userVotes[currentUser]) {
      alert("You have already voted!");
      return;
    }

    votes[candidate] = (votes[candidate] || 0) + 1;
    userVotes[currentUser] = true;

    localStorage.setItem("votes", JSON.stringify(votes));
    localStorage.setItem("userVotes", JSON.stringify(userVotes));

    alert(`Vote casted for ${candidate}`);
  });
});

// Export votes
document.getElementById("exportBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(votes)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "votes.json";
  a.click();
});

// Import votes
document.getElementById("importBtn").addEventListener("click", () => {
  document.getElementById("fileInput").click();
});

document.getElementById("fileInput").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    votes = JSON.parse(e.target.result);
    localStorage.setItem("votes", JSON.stringify(votes));
    alert("Votes imported successfully!");
  };
  reader.readAsText(file);
});

// Clear data
document.getElementById("clearBtn").addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all votes?")) {
    votes = {};
    userVotes = {};
    localStorage.setItem("votes", JSON.stringify(votes));
    localStorage.setItem("userVotes", JSON.stringify(userVotes));
    alert("All data cleared!");
  }
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
});

