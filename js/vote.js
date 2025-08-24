// Example candidate list (you already have this in your code)
const candidates = ["Candidate 1", "Candidate 2", "Candidate 3", "Candidate 4"];

let votes = JSON.parse(localStorage.getItem("votes")) || {};
let loggedInUser = localStorage.getItem("loggedInUser");

// Ensure votes object has all candidates
candidates.forEach(c => {
  if (!votes[c]) votes[c] = 0;
});

const container = document.getElementById("candidatesContainer");

// Render candidates
candidates.forEach(name => {
  const div = document.createElement("div");
  div.classList.add("candidate");

  const span = document.createElement("span");
  span.textContent = name;

  const btn = document.createElement("button");
  btn.classList.add("vote-btn");
  btn.textContent = "Vote";

  // disable button if this user already voted
  let userVotes = JSON.parse(localStorage.getItem("userVotes")) || {};
  if (userVotes[loggedInUser]) {
    btn.disabled = true;
    btn.style.opacity = "0.6";
    btn.style.cursor = "not-allowed";
  }

  btn.addEventListener("click", () => {
    // prevent multiple votes
    let userVotes = JSON.parse(localStorage.getItem("userVotes")) || {};
    if (userVotes[loggedInUser]) {
      alert("You already voted!");
      return;
    }

    votes[name]++;
    userVotes[loggedInUser] = name; // store candidate name for this user
    localStorage.setItem("votes", JSON.stringify(votes));
    localStorage.setItem("userVotes", JSON.stringify(userVotes));

    alert(`Thanks for voting for ${name}!`);
    btn.disabled = true;
    btn.style.opacity = "0.6";
    btn.style.cursor = "not-allowed";
  });

  div.appendChild(span);
  div.appendChild(btn);
  container.appendChild(div);
});

