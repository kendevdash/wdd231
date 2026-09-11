// ==========================================================================
//  Provo Valley Chamber of Commerce – directory.js
// ==========================================================================

const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

const MEMBERSHIP_LABELS = { 1: "Member", 2: "Silver Member", 3: "Gold Member" };

// --- Fetch the member data and render it ----------------------------------
async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    membersContainer.innerHTML =
      "<p class=\"loading\">Sorry, the member directory could not be loaded right now.</p>";
    console.error("Unable to load data/members.json:", error);
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    card.className = "member-card";

    const label = MEMBERSHIP_LABELS[member.membership] || "Member";
    const telHref = `+1${member.phone.replace(/\D/g, "")}`;

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" width="240" height="160" loading="lazy">
      <div class="member-body">
        <h2>${member.name}</h2>
        <p class="member-category">${member.category}</p>
        <p>${member.description}</p>
        <p>${member.address}</p>
        <p><a href="tel:${telHref}">${member.phone}</a></p>
        <a class="member-link" href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
        <span class="badge badge-${member.membership}">${label}</span>
      </div>
    `;

    membersContainer.appendChild(card);
  });
}

getMembers();

// --- Grid / List view toggle ----------------------------------------------
gridButton.addEventListener("click", () => {
  membersContainer.classList.add("grid");
  membersContainer.classList.remove("list");
  gridButton.setAttribute("aria-pressed", "true");
  listButton.setAttribute("aria-pressed", "false");
});

listButton.addEventListener("click", () => {
  membersContainer.classList.add("list");
  membersContainer.classList.remove("grid");
  listButton.setAttribute("aria-pressed", "true");
  gridButton.setAttribute("aria-pressed", "false");
});

// --- Mobile hamburger navigation -------------------------------------------
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("nav");

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  menuButton.innerHTML = isOpen ? "&#10005;" : "&#9776;";
});

navigation.addEventListener("click", (event) => {
  if (event.target.matches("a") && navigation.classList.contains("open")) {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
    menuButton.innerHTML = "&#9776;";
  }
});

// --- Footer: dynamic copyright year and last modified date ----------------
document.querySelector("#currentyear").textContent = new Date().getFullYear();

document.querySelector("#lastModified").textContent =
  `Last Modification: ${document.lastModified}`;
