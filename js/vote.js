let votes = JSON.parse(localStorage.getItem("votes")) || {
  Vibhanshu: 0,
  Sharayu: 0,
  XYZ: 0
};

let voters = JSON.parse(localStorage.getItem("voters")) || {};
let currentUser = localStorage.getItem("currentUser");

// Check login
if (!currentUser) {
  window.location.href = "index.html";
} else {
  document.getElementById("welcomeUser").innerText = `Logged in as: ${currentUser}`;
}

// Save votes + voters
function saveData() {
  localStorage.setItem("votes", JSON.stringify(votes));
  localStorage.setItem("voters", JSON.stringify(voters));
  updateResults();
}

function vote(candidate) {
  if (voters[currentUser]) {
    alert("You have already voted!");
    return;
  }
  votes[candidate]++;
  voters[currentUser] = true;
  alert(`Thanks! ${currentUser}, your vote for ${candidate} has been recorded.`);
  saveData();
  disableVoting();
}

function updateResults() {
  const resultsDiv = document.getElementById("resultsList");
  resultsDiv.innerHTML = "";
  let total = 0;
  for (let [name, count] of Object.entries(votes)) {
    resultsDiv.innerHTML += `<p>${name}: ${count} votes</p>`;
    total += count;
  }
  document.getElementById("totalVotes").innerText = `Total votes: ${total}`;
}

// Disable voting if user already voted
function disableVoting() {
  if (voters[currentUser]) {
    document.querySelectorAll(".candidate button").forEach(btn => {
      btn.disabled = true;
      btn.style.background = "#888";
      btn.style.cursor = "not-allowed";
    });
  }
}

function clearVotes() {
  if (confirm("Clear all votes and voters?")) {
    votes = { Vibhanshu: 0, Sharayu: 0, Khushab: 0 };
    voters = {};
    saveData();
  }
}

function exportVotes() {
  const data = JSON.stringify({ votes, voters });
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "votes.json";
  a.click();
}

function importVotes(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    const imported = JSON.parse(e.target.result);
    votes = imported.votes || votes;
    voters = imported.voters || voters;
    saveData();
    disableVoting();
  };
  reader.readAsText(file);
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

updateResults();
disableVoting();
