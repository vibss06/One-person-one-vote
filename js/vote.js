// ---- CONFIG: Candidate list ----
const candidates = [
  { name: "Sharayu ", desc: "2nd year Student of DATA SCIENCE (DS-38)" },
  { name: "Vibhanshu", desc: "2nd year Student of DATA SCEINCE  (DS-39)" },
  { name: "ABC", desc: "Not a group member" },
  { name: "XYZ", desc: "Not group member" }
];

// ---- Load logged-in user ----
let currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
  window.location.href = "index.html"; // if no login, redirect
}
document.getElementById("userInfo").innerText = `Logged in as: ${currentUser}`;

// ---- Load votes from localStorage ----
let votes = JSON.parse(localStorage.getItem("votes")) || {};
let userVotes = JSON.parse(localStorage.getItem("userVotes")) || {}; // track per user

// ---- Render candidates ----
const container = document.getElementById("candidatesContainer");
container.innerHTML = "";
candidates.forEach((c, index) => {
  const card = document.createElement("div");
  card.className = "candidate-card";
  card.innerHTML = `
    <div class="candidate-name">${c.name}</div>
    <div class="candidate-desc">${c.desc}</div>
    <button class="vote-btn" id="voteBtn${index}">Vote</button>
    <p id="voteCount${index}" class="vote-count">Votes: ${votes[c.name] || 0}</p>
  `;
  container.appendChild(card);

  const btn = card.querySelector(`#voteBtn${index}`);
  if (userVotes[currentUser]) btn.disabled = true; // disable if already voted

  btn.addEventListener("click", () => {
    if (!userVotes[currentUser]) {
      votes[c.name] = (votes[c.name] || 0) + 1;
      userVotes[currentUser] = c.name;

      localStorage.setItem("votes", JSON.stringify(votes));
      localStorage.setItem("userVotes", JSON.stringify(userVotes));

      document.getElementById(`voteCount${index}`).innerText = `Votes: ${votes[c.name]}`;
      btn.disabled = true;
    }
  });
});

// ---- Clear data ----
document.getElementById("clearDataBtn").addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all votes?")) {
    votes = {};
    userVotes = {};
    localStorage.setItem("votes", JSON.stringify(votes));
    localStorage.setItem("userVotes", JSON.stringify(userVotes));
    location.reload();
  }
});

// ---- Export data ----
document.getElementById("exportBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify({ votes, userVotes })], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "votes-data.json";
  a.click();
});

// ---- Import data ----
document.getElementById("importBtn").addEventListener("click", () => {
  document.getElementById("importFile").click();
});
document.getElementById("importFile").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      votes = data.votes || {};
      userVotes = data.userVotes || {};
      localStorage.setItem("votes", JSON.stringify(votes));
      localStorage.setItem("userVotes", JSON.stringify(userVotes));
      location.reload();
    } catch {
      alert("Invalid file format!");
    }
  };
  reader.readAsText(file);
});

// ---- Logout ----
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
document.getElementById("logoutBtn").addEventListener("click", logout);

